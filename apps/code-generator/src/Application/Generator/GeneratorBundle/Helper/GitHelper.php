<?php

namespace App\Application\Generator\GeneratorBundle\Helper;

use Symfony\Component\Process\Process;

class GitHelper
{
    protected string $organization = "geradordesistemas";
    protected string $organizationPass = "REDACTED_GITHUB_TOKEN";
    protected string $gitBaseRepository = 'https://github.com/geradordesistemas/base';

    public function __construct(
        protected string $workingDirectory,
        protected string $projectDirectory,
        protected string $projectName,
        protected string $projectNameBuild,
        protected ?string $baseTemplateDir = null,
    )
    {
    }

    /**
     * Se $baseTemplateDir foi informado (modo monorepo local), copia o template do volume
     * read-only em vez de fazer git clone do GitHub. Mantém o método antigo para o fluxo AWS.
     */
    public function cloneBaseRepository(): bool
    {
        $this->removeDir($this->projectDirectory);

        if ($this->baseTemplateDir !== null && is_dir($this->baseTemplateDir)) {
            return $this->copyFromLocalTemplate();
        }

        $command = ['git', 'clone', $this->gitBaseRepository, $this->projectNameBuild];
        $process = new Process($command);
        $process->setWorkingDirectory($this->workingDirectory);
        $process->run();

        return $process->isSuccessful();
    }

    /**
     * Garante que o workingDirectory exista e copia o template local recursivamente
     * preservando atributos (cp -a).
     */
    protected function copyFromLocalTemplate(): bool
    {
        // Garante que tanto o workingDirectory quanto o projectDirectory existam
        // antes do cp; `cp -a src/. dst/` exige que dst exista.
        (new Process(['mkdir', '-p', $this->projectDirectory]))->run();

        $command = ['cp', '-a', rtrim($this->baseTemplateDir, '/') . '/.', $this->projectDirectory];
        $process = new Process($command);
        $process->run();

        return $process->isSuccessful();
    }


    public function removeDir($directory): void
    {
        if( is_dir( $directory) ){
            $command = ['rm', '-rf', $directory];
            $process = new Process($command);
            $process->setWorkingDirectory($this->workingDirectory);
            $process->run();
        }
    }

    public function getRepositoryName(): string
    {
        return "https://github.com/$this->organization/$this->projectNameBuild.git";
    }

    public function commitProject(): string
    {
        $dir = $this->projectDirectory;

        //dd($dir);

        $commands = [
            ['rm', '-rf', '.git'],
            ['git', 'init'],
            ['git', 'add', '.'],
            ['git', 'commit', '-m', 'First Commit - By Gerador de Sistemas'],
            ['git', 'branch', '-M', 'main'],
            ['hub', 'delete', '-y', "$this->organization/$this->projectNameBuild"],
            ['hub', 'create'],
            ['git', 'push', "https://$this->organization:$this->organizationPass@github.com/$this->organization/$this->projectNameBuild.git"  ]
        ];

        $status = [];
        foreach ($commands as $command){
            $status[] = $this->runCommand(commands: $command, directory: $dir);
        }
        //dd($status);

        return "https://github.com/$this->organization/$this->projectNameBuild.git";
        //dd($status);
    }

    protected function runCommand($commands, $directory): bool
    {
        $process = new Process($commands);
        $process->setWorkingDirectory($directory);
        $process->run();

        return $process->isSuccessful();
    }

}