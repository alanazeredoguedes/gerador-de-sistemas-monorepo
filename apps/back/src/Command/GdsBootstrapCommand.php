<?php

namespace App\Command;

use App\Application\Project\UserBundle\Entity\User;
use App\Entity\Framework;
use App\Entity\ProgrammingLanguage;
use App\Entity\SonataMediaMedia;
use Doctrine\ORM\EntityManagerInterface;
use Sonata\MediaBundle\Model\MediaManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * Bootstrap idempotente do GDS back. Cria, na primeira subida:
 *  - usuários padrão (admin + user)
 *  - ProgrammingLanguage "PHP" com logo
 *  - Framework "Symfony" com logo, vinculado ao PHP
 *
 * Os arquivos-fonte dos logos vivem em apps/back/data/seed/ e são versionados
 * junto do código. Chamado pelo scripts/bootstrap.sh do monorepo.
 */
#[AsCommand(
    name: 'gds:bootstrap',
    description: 'Cria admin, usuário e seed inicial (PHP/Symfony) no GDS.'
)]
class GdsBootstrapCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $hasher,
        private MediaManagerInterface $mediaManager,
        private KernelInterface $kernel,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('admin-username', null, InputOption::VALUE_REQUIRED, 'Username do admin', 'admin')
            ->addOption('admin-email',    null, InputOption::VALUE_REQUIRED, 'Email do admin', 'admin@gds.local')
            ->addOption('admin-password', null, InputOption::VALUE_REQUIRED, 'Senha do admin', 'admin')
            ->addOption('user-username',  null, InputOption::VALUE_REQUIRED, 'Username do user',  'user')
            ->addOption('user-email',     null, InputOption::VALUE_REQUIRED, 'Email do user',  'user@gds.local')
            ->addOption('user-password',  null, InputOption::VALUE_REQUIRED, 'Senha do user',  'user');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $admin = $this->ensureUser(
            username:   $input->getOption('admin-username'),
            email:      $input->getOption('admin-email'),
            password:   $input->getOption('admin-password'),
            apiRoles:   ['ROLE_SUPER_API'],
            adminRoles: ['ROLE_SUPER_ADMIN'],
        );
        $io->writeln(sprintf(' admin: %s <%s> %s',
            $admin['user']->getUsername(),
            $admin['user']->getEmail(),
            $admin['created'] ? '(criado)' : '(já existia)'
        ));

        $user = $this->ensureUser(
            username:   $input->getOption('user-username'),
            email:      $input->getOption('user-email'),
            password:   $input->getOption('user-password'),
            apiRoles:   ['ROLE_SUPER_API'],
            adminRoles: [],
        );
        $io->writeln(sprintf(' user:  %s <%s> %s',
            $user['user']->getUsername(),
            $user['user']->getEmail(),
            $user['created'] ? '(criado)' : '(já existia)'
        ));

        $php = $this->ensureProgrammingLanguage(
            name:        'PHP',
            description: 'PHP é uma linguagem de script open-source de propósito geral, especialmente adequada para desenvolvimento web e que pode ser embutida em HTML.',
            logoFile:    'logo_php.png',
        );
        $io->writeln(sprintf(' lang:  %s %s',
            $php['entity']->getName(),
            $php['created'] ? '(criado)' : '(já existia)'
        ));

        $symfony = $this->ensureFramework(
            name:                'Symfony',
            description:         'Symfony é um framework PHP de alta performance para construção de aplicações web e APIs, baseado em componentes reutilizáveis.',
            programmingLanguage: $php['entity'],
            logoFile:            'symfony_logo.png',
        );
        $io->writeln(sprintf(' fwk:   %s (lang=%s) %s',
            $symfony['entity']->getName(),
            $symfony['entity']->getProgrammingLanguage()?->getName() ?? '-',
            $symfony['created'] ? '(criado)' : '(já existia)'
        ));

        $this->em->flush();
        $io->success('Bootstrap GDS concluído.');

        return Command::SUCCESS;
    }

    /**
     * @return array{user: User, created: bool}
     */
    private function ensureUser(string $username, string $email, string $password, array $apiRoles, array $adminRoles): array
    {
        $repo = $this->em->getRepository(User::class);

        $existing = $repo->findOneBy(['email' => $email])
            ?? $repo->findOneBy(['username' => $username]);

        if ($existing) {
            return ['user' => $existing, 'created' => false];
        }

        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setApiRoles($apiRoles);
        $user->setAdminRoles($adminRoles);
        $user->setRoles([]);
        $user->setPassword($this->hasher->hashPassword($user, $password));

        $this->em->persist($user);

        return ['user' => $user, 'created' => true];
    }

    /**
     * @return array{entity: ProgrammingLanguage, created: bool}
     */
    private function ensureProgrammingLanguage(string $name, string $description, string $logoFile): array
    {
        $repo = $this->em->getRepository(ProgrammingLanguage::class);
        $existing = $repo->findOneBy(['name' => $name]);
        if ($existing) {
            return ['entity' => $existing, 'created' => false];
        }

        $pl = new ProgrammingLanguage();
        $pl->setName($name);
        $pl->setDescription($description);
        $pl->setActive(true);
        $pl->setLogo($this->createMediaFromSeed($logoFile));

        $this->em->persist($pl);

        return ['entity' => $pl, 'created' => true];
    }

    /**
     * @return array{entity: Framework, created: bool}
     */
    private function ensureFramework(string $name, string $description, ProgrammingLanguage $programmingLanguage, string $logoFile): array
    {
        $repo = $this->em->getRepository(Framework::class);
        $existing = $repo->findOneBy(['name' => $name]);
        if ($existing) {
            return ['entity' => $existing, 'created' => false];
        }

        $fw = new Framework();
        $fw->setName($name);
        $fw->setDescription($description);
        $fw->setActive(true);
        $fw->setProgrammingLanguage($programmingLanguage);
        $fw->setLogo($this->createMediaFromSeed($logoFile));

        $this->em->persist($fw);

        return ['entity' => $fw, 'created' => true];
    }

    /**
     * Cria um SonataMediaMedia a partir de um arquivo em apps/back/data/seed/,
     * delegando o upload pro provider de imagem do Sonata (que copia o binário
     * para public/uploads/media e gera os formats).
     */
    private function createMediaFromSeed(string $fileName): SonataMediaMedia
    {
        $path = $this->kernel->getProjectDir() . '/data/seed/' . $fileName;
        if (!is_file($path)) {
            throw new \RuntimeException(sprintf('Arquivo de seed não encontrado: %s', $path));
        }

        $media = new SonataMediaMedia();
        $media->setBinaryContent($path);
        $media->setProviderName('sonata.media.provider.image');
        $media->setContext('default');
        $media->setName($fileName);

        $this->mediaManager->save($media, 'default', 'sonata.media.provider.image');

        return $media;
    }
}
