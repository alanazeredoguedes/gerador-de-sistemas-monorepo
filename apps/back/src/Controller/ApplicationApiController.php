<?php

namespace App\Controller;

use App\Application\Project\ContentBundle\Attributes\ARR;
use App\Application\Project\ContentBundle\Controller\DefaultAbstractController;
use App\Application\Project\ContentBundle\Helper\AwsHelper\AwsHelper;
use App\Entity\Application;
use App\Entity\Diagram;
use App\Entity\Framework;
use App\Entity\ProgrammingLanguage;
use Sonata\MediaBundle\Provider\Pool;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Application\Project\UserBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\Exception\ExceptionInterface as HttpClientException;


##[IsGranted('IS_AUTHENTICATED_FULLY')]
#[OA\Tag(name: 'Application')]
#[ARR(groupName: 'Aplicações', description: 'Permissões Api do modulo Aplicações')]
#[Route('/api/application', name: 'api_application_')]
class ApplicationApiController extends DefaultAbstractController
{

    private function getRepository(): string
    {
        return Application::class;
    }

    /** @throws ExceptionInterface */
    #[OA\Response(
        response: 200,
        description: 'Return data list',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'id', type: 'int'),
                new OA\Property(property: 'name', type: 'string'),
                new OA\Property(property: 'description', type: 'string'),
                new OA\Property(property: 'diagram',  type: 'integer', nullable: false),
                new OA\Property(property: 'framework',  type: 'integer', nullable: false),
            ],
            type: 'object'
        )
    )]
    #[ARR(routerName: 'listAction', role: "ROLE_API_DIAGRAM_LIST", title: 'Listar')]
    #[Route('', name: 'list', methods: ['GET'])]
    public function listAction(ManagerRegistry $doctrine): Response
    {
        $this->validateAccess("ROLE_API_DIAGRAM_LIST");

        $user = $this->getUser();


        $objectData = $doctrine->getRepository( $this->getRepository() )->findBy(['user' => $user]);

        $responseData = [];
        foreach ($objectData as $data){

            $serializer = new Serializer([new ObjectNormalizer()]);
            $dataSerialize = $serializer->normalize($data, null, [
                AbstractNormalizer::ATTRIBUTES => [
                    'id',
                    'name',
                    'description',
                    'diagram'=>[
                        'id',
                        'name',
                        'description'
                    ],
                    'framework'=>[
                        'id',
                        'name',
                        'logo',
                        'programmingLanguage' => [
                            'id',
                            'name',
                            'logo'
                        ]
                    ],
                ],
                AbstractNormalizer::IGNORED_ATTRIBUTES => []
            ]);
            $dataSerialize['framework']['logo'] = $this->getMediaUrl($data->getFramework()->getLogo());
            $dataSerialize['framework']['programmingLanguage']['logo'] = $this->getMediaUrl($data->getFramework()->getProgrammingLanguage()->getLogo());

            $responseData[] = $dataSerialize;
        }
        return $this->json($responseData);
    }

    #[OA\RequestBody(
        description: 'Json Payload',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'name', type: 'string', nullable: false),
                new OA\Property(property: 'description', type: 'string', nullable: false),
                new OA\Property(property: 'diagram',  type: 'integer', nullable: false),
                new OA\Property(property: 'framework',  type: 'integer', nullable: false),
            ],
            type: 'object'
        )
    )]
    #[Route('', name: 'create', methods: ['POST'])]
    #[ARR(routerName: 'createAction', role: "ROLE_API_DIAGRAM_CREATE", title: 'Criar')]
    public function createAction(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $this->validateAccess("ROLE_API_DIAGRAM_CREATE");
        $user = $this->getUser();

        $entityManager = $doctrine->getManager();

        $parameters = [
            'name'         => [ 'type' => 'string', 'required' => true, 'nullable' => false ],
            'description'  => [ 'type' => 'string', 'required' => true, 'nullable' => false ],
            'diagram'      => [ 'type' => 'integer', 'required' => true, 'nullable' => false ],
            'framework'    => [ 'type' => 'integer', 'required' => true, 'nullable' => false ],
        ];

        $requestBody = json_decode($request->getContent());

        if($this->validateJsonRequestBody($requestBody, $parameters))
            return $this->validateJsonRequestBody($requestBody, $parameters);

        $data = new Application();

        if(property_exists($requestBody, 'name'))
            $data->setName($requestBody->name);

        if(property_exists($requestBody, 'description'))
            $data->setDescription($requestBody->description);

        if(property_exists($requestBody, 'diagram')){
            $diagram = $entityManager->getRepository(Diagram::class)->findOneBy(['id' => $requestBody->diagram]);
            $data->setDiagram($diagram);
        }

        if(property_exists($requestBody, 'framework')){
            $framework = $entityManager->getRepository(Framework::class)->findOneBy(['id' => $requestBody->framework]);
            $data->setFramework($framework);
        }

        $data->setUser($user);

        $entityManager->persist($data);
        $entityManager->flush();

        return $this->json([
            'status' => true,
            'message' => "Sucesso ao criar aplicação!",
        ]);
    }


    /** @throws ExceptionInterface */
    #[OA\Response(
        response: 200,
        description: 'Return data',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'name', type: 'string', nullable: false),
                new OA\Property(property: 'description', type: 'string', nullable: false),
                new OA\Property(property: 'diagram',  type: 'integer', nullable: false),
                new OA\Property(property: 'framework',  type: 'integer', nullable: false),
            ],
            type: 'object'
        )
    )]
    #[Route('/{id}', name: 'show', methods: ['GET'])]
    #[ARR(routerName: 'showAction', role: "ROLE_API_APPLICATION_SHOW", title: 'Visualizar')]
    public function showAction(ManagerRegistry $doctrine, int $id): Response
    {
        $this->validateAccess("ROLE_API_APPLICATION_SHOW");
        $user = $this->getUser();

        $objectData = $doctrine->getRepository($this->getRepository())->findOneBy(['id' => $id ,'user' => $user]);

        if (!$objectData)
            return $this->json([
                'status' => false,
                'message' => "Aplicação não encontrada.",
            ], 404);

        $serializer = new Serializer([new ObjectNormalizer()]);
        $response = $serializer->normalize($objectData, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'name',
                'description',
                'url',
                'accessEmail',
                'accessPassword',
                'repository',
                'downloadUrl',
                'diagram'=>[
                    'id',
                    'name',
                    'description',
                    'structure'
                ],
                'framework'=>[
                    'id',
                    'name',
                    'logo',
                    'programmingLanguage' => [
                        'id',
                        'name',
                        'logo'
                    ]
                ],
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => []
        ]);
        $response['framework']['logo'] = $this->getMediaUrl($objectData->getFramework()->getLogo());
        $response['framework']['programmingLanguage']['logo'] = $this->getMediaUrl($objectData->getFramework()->getProgrammingLanguage()->getLogo());

        return $this->json($response);
    }


    #[OA\RequestBody(
        description: 'Json Payload',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'name', type: 'string', nullable: false),
                new OA\Property(property: 'description', type: 'string', nullable: false),
                new OA\Property(property: 'diagram',  type: 'integer', nullable: false),
                new OA\Property(property: 'framework',  type: 'integer', nullable: false),
            ],
            type: 'object'
        )
    )]
    #[Route('/{id}', name: 'edit', methods: ['PUT'])]
    #[ARR(routerName: 'editAction', role: "ROLE_API_APPLICATION_EDIT", title: 'Editar')]
    public function editAction(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $this->validateAccess("ROLE_API_APPLICATION_EDIT");
        $user = $this->getUser();

        $entityManager = $doctrine->getManager();

        $parameters = [
            'name'         => [ 'type' => 'string', 'required' => true, 'nullable' => false ],
            'description'  => [ 'type' => 'string', 'required' => true, 'nullable' => false ],
            'diagram'      => [ 'type' => 'integer', 'required' => true, 'nullable' => false ],
            'framework'    => [ 'type' => 'integer', 'required' => true, 'nullable' => false ],
        ];

        $requestBody = json_decode($request->getContent());

        if($this->validateJsonRequestBody($requestBody, $parameters))
            return $this->validateJsonRequestBody($requestBody, $parameters);


        $data = $doctrine->getRepository($this->getRepository())->findOneBy(['id' => $id ,'user' => $user]);

        if (!$data)
            return $this->json('Aplicação não encontrada', 404);


        if(property_exists($requestBody, 'name'))
            $data->setName($requestBody->name);

        if(property_exists($requestBody, 'description'))
            $data->setDescription($requestBody->description);

        if(property_exists($requestBody, 'diagram')){
            $diagram = $entityManager->getRepository(Diagram::class)->findOneBy(['id' => $requestBody->diagram]);
            $data->setDiagram($diagram);
        }

        if(property_exists($requestBody, 'framework')){
            $framework = $entityManager->getRepository(Framework::class)->findOneBy(['id' => $requestBody->framework]);
            $data->setFramework($framework);
        }

        $entityManager->persist($data);
        $entityManager->flush();

        return $this->json([
            'status' => true,
            'message' => "Sucesso ao atualizar aplicação!",
        ], 200);
    }



    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[ARR(routerName: 'deleteAction', role: "ROLE_API_APPLICATION_DELETE", title: 'Deletar')]
    public function deleteAction(ManagerRegistry $doctrine, int $id): Response
    {
        $this->validateAccess("ROLE_API_APPLICATION_DELETE");
        $user = $this->getUser();

        $entityManager = $doctrine->getManager();

        $data = $doctrine->getRepository($this->getRepository())->findOneBy(['id' => $id ,'user' => $user]);

        /** Verifica se o diagrama existe */
        if (!$data)
            return $this->json([
                'status' => false,
                'message' => 'Erro ao remover aplicação!',
            ], 404);

        $entityManager->remove($data);
        $entityManager->flush();

        return $this->json([
            'status' => true,
            'message' => 'Aplicação removida com sucesso ',
        ]);
    }


    /**
     * Callback HTTP recebido do code-generator quando o repositório do app gerado fica disponível.
     * Substitui o antigo polling de SQS por POST direto (monorepo local; em prod AWS, voltar
     * a usar SNS/SQS via awsHelper).
     */
    #[Route('/generate/getRepository', name: 'generate_get_generate_repository', methods: ['POST'])]
    public function getApplicationRepositoryAction(ManagerRegistry $doctrine, Request $request): Response
    {
        $message = json_decode($request->getContent());

        if (!$message || !property_exists($message, 'app') || !property_exists($message, 'repository'))
            return $this->json(['status' => false, 'message' => 'Payload inválido: { app, repository } obrigatórios.'], 400);

        $em = $doctrine->getManager();
        $application = $doctrine->getRepository(Application::class)->find($message->app);

        if (!$application)
            return $this->json(['status' => false, 'message' => 'Aplicação não encontrada.'], 404);

        $application->setRepository($message->repository);

        $em->persist($application);
        $em->flush();

        return $this->json(['status' => true]);
    }

    /**
     * Callback HTTP recebido do code-generator quando o servidor do app gerado fica disponível
     * (ou, no modo MOCK_DEPLOY, quando o code-generator termina de gravar os arquivos localmente).
     */
    #[Route('/generate/getServer', name: 'generate_get_generate_server', methods: ['POST'])]
    public function getApplicationServerAction(ManagerRegistry $doctrine, Request $request): Response
    {
        $message = json_decode($request->getContent());

        if (!$message || !property_exists($message, 'app'))
            return $this->json(['status' => false, 'message' => 'Payload inválido: { app, url, email, password } esperado.'], 400);

        $em = $doctrine->getManager();
        $application = $doctrine->getRepository(Application::class)->find($message->app);

        if (!$application)
            return $this->json(['status' => false, 'message' => 'Aplicação não encontrada.'], 404);

        if (property_exists($message, 'url'))         $application->setUrl($message->url);
        if (property_exists($message, 'email'))       $application->setAccessEmail($message->email);
        if (property_exists($message, 'password'))    $application->setAccessPassword($message->password);
        if (property_exists($message, 'downloadUrl')) $application->setDownloadUrl($message->downloadUrl);
        $application->setLastGenerate(null);

        $em->persist($application);
        $em->flush();

        return $this->json(['status' => true]);
    }



    #[Route('/generate/{id}', name: 'generate_application', methods: ['GET'])]
    #[ARR(routerName: 'generateApplication', role: "ROLE_API_APPLICATION_GENERATE", title: 'Gerar Aplicação')]
    public function generateApplicationAction(ManagerRegistry $doctrine, HttpClientInterface $httpClient, int $id): Response
    {
        $this->validateAccess("ROLE_API_APPLICATION_GENERATE");
        $user = $this->getUser();

        //$user = $doctrine->getRepository(User::class)->find(1);

        /** @var Application */
        $application = $doctrine->getRepository(Application::class)->findOneBy(['id' => $id ,'user' => $user]);

        if (!$application)
            return $this->json([
                'status' => false,
                'message' => "Aplicação não encontrada.",
            ], 404);

        /** Verifica se ja pode estar criando nova aplicação */
        $dataLastGenerate = $application->getLastGenerate();
        if($dataLastGenerate){

            $dataLastGenerate->add(new \DateInterval('PT' . 10 . 'M'));
            $dataLastGenerate->format('Y-m-d H:i');

            if( $dataLastGenerate >= new \DateTime('now') )
                return $this->json([
                    'status' => true,
                    'message'=> 'Sua aplicação já está em processo de geração, aguarde alguns minutos enquanto o processo é finalizado!'
                ]);
        }


        $response = [
            'user'=> [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
            ],
            'app' => [
                'id' => $application->getId(),
                'name' => $application->getName(),
                'description' => $application->getDescription(),
                'diagram' => [
                    'id' => $application->getDiagram()->getId(),
                    'name' => $application->getDiagram()->getName(),
                    'structure' => json_decode( $application->getDiagram()->getStructure() ),
                ],
            ],

        ];

        /**
         * Importante: gravamos o "início da geração" ANTES de chamar o code-generator.
         * Como o codegen no monorepo é síncrono e dispara callbacks (/getServer, /getRepository)
         * para outras requisições HTTP em paralelo, se persistíssemos depois teríamos uma
         * race condition: os callbacks já teriam gravado downloadUrl/lastGenerate=null no DB
         * e o flush tardio sobrescreveria lastGenerate=now de novo, travando o registro
         * dentro do rate-limit de 10 min em toda regeração subsequente.
         */
        $em = $doctrine->getManager();
        $application->setLastGenerate(new \DateTime('now'));
        $application->setUrl(null);
        $application->setRepository(null);
        $application->setAccessEmail(null);
        $application->setAccessPassword(null);
        $application->setDownloadUrl(null);
        $em->persist($application);
        $em->flush();

        $codegenUrl = getenv('CODE_GENERATOR_URL') ?: 'http://codegen-nginx';
        try {
            $codegenResponse = $httpClient->request('POST', rtrim($codegenUrl, '/') . '/generate', [
                'json' => $response,
                'timeout' => 600, // ZIP de projeto grande pode demorar; codegen é síncrono aqui
                'headers' => ['Accept' => 'application/json'],
            ]);
            $status = $codegenResponse->getStatusCode() === 200;
        } catch (HttpClientException $e) {
            $status = false;
        }

        if (!$status) {
            // Reverte o lock pra permitir nova tentativa imediata.
            $em->refresh($application);
            $application->setLastGenerate(null);
            $em->flush();

            return $this->json([
                'status' => false,
                'message' => "Não foi possível gerar sua aplicação no momento, tente em outro momento!",
            ], 503);
        }

        return $this->json([
            'status' => true,
            'message' => "Começamos a gerar sua aplicação, em alguns minutos finalizaremos os procedimentos!",
        ]);
    }

    /*#[Route('/aws/email', name: 'email', methods: ['GET'])]
    public function testesqs(): Response
    {
        $this->awsHelper->ses->sendEmail();

        return $this->json('ok');
    }*/


        #[Route('/aws/testesns', name: 'testesns', methods: ['GET'])]
        public function testesns(): Response
        {

            $status = $this->awsHelper->sns->sendMessageGdsGerarSistema(json_encode(['code'=> 'gerar sistema']));
            //$status = $this->awsHelper->sns->sendMessageGdsSistemaGeradoRepositorio(json_encode(['code'=> 'sistema gerado repo']));
            //$status = $this->awsHelper->sns->sendMessageGdsSistemaGeradoServidor(json_encode(['code'=> 'sistema gerador server']));

            return $this->json($status);
        }


            #[Route('/aws/testesqs', name: 'testesqs', methods: ['GET'])]
            public function testesqs(): Response
            {

                $message = $this->awsHelper->sqs->getMessageGdsGerarSistema();
                //$message = $this->awsHelper->sqs->getMessageGdsSistemaGeradoRepositorio();
                //$message = $this->awsHelper->sqs->getMessageGdsSistemaGeradoServidor();

                return $this->json($message);
            }

}