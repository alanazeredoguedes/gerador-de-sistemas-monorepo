<?php

namespace App\Controller;

use App\Application\Generator\GeneratorBundle\AwsHelper\AwsHelper;
use App\Application\Generator\GeneratorBundle\Generator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class IntegrationController extends AbstractController
{
    protected AwsHelper $awsHelper;

    public function __construct(
        protected ContainerBagInterface $containerInterface,
        protected HttpClientInterface $httpClient,
    )
    {
        $this->awsHelper = new AwsHelper($this->containerInterface);
    }

    /**
     * Recebe o payload de geração do back (POST direto, monorepo local).
     * No fluxo AWS original esse endpoint era polled via SQS — agora aceita o
     * payload no body e dispara o gerador sincronamente.
     */
    #[Route('/generate', name: 'app_integration', methods: ['POST'])]
    public function index(Request $request): JsonResponse
    {
        $message = json_decode($request->getContent());
        if (!$message || !isset($message->app) || !isset($message->user)) {
            return $this->json(['status' => false, 'message' => 'Payload inválido: esperado { user, app }.'], 400);
        }

        $mockDeploy              = filter_var(getenv('MOCK_DEPLOY') ?: '0', FILTER_VALIDATE_BOOLEAN);
        $outputDirectory         = getenv('OUTPUT_DIR') ?: '/var/www/output/generated-apps';
        $baseTemplateDir         = getenv('BASE_TEMPLATE_DIR') ?: null;
        $backUrl                 = getenv('BACK_URL') ?: 'http://back-nginx';
        $zipsDirectory           = getenv('ZIPS_DIR') ?: '/var/www/output/downloads';
        $publicDownloadsBaseUrl  = getenv('PUBLIC_DOWNLOADS_BASE_URL') ?: null;

        $generator = new Generator(
            projectData:             $message,
            kernelDirectory:         $this->getParameter('kernel.project_dir'),
            awsHelper:               $this->awsHelper,
            httpClient:              $this->httpClient,
            outputDirectory:         $outputDirectory,
            baseTemplateDir:         $baseTemplateDir,
            backUrl:                 $backUrl,
            mockDeploy:              $mockDeploy,
            zipsDirectory:           $zipsDirectory,
            publicDownloadsBaseUrl:  $publicDownloadsBaseUrl,
        );

        try {
            $status = $generator->startGenerator();
        } catch (\Throwable $e) {
            return $this->json([
                'status' => false,
                'message' => 'Falha durante geração: ' . $e->getMessage(),
            ], 500);
        }

        return $this->json([
            'status' => $status,
            'mockDeploy' => $mockDeploy,
            'outputDir' => $outputDirectory,
        ]);
    }

    #[Route('/', name: 'app_home')]
    public function home(Request $request): JsonResponse
    {
        return $this->json(['service' => 'gds-code-generator', 'status' => 'ok']);
    }

    #[Route('/removeInstancesBase', name: 'remove_instance_base')]
    public function removeInstanceBase(Request $request): JsonResponse
    {
        $ec2 = $this->awsHelper->ec2;
        $instances = $ec2->getInstancesByTag("Group", "generate-instance");

        foreach ( $instances as $instance ){
            if($instance['State']['Name'] === "terminated")
                continue;

            $ec2->terminateInstance($instance['InstanceId']);
        }

        return $this->json('remove');
    }

    public function convertJsonProject($json)
    {
        $serializer = new Serializer(array(new GetSetMethodNormalizer()), array('json' => new JsonEncoder()));
        return $serializer->decode($json, 'json');
    }

}
