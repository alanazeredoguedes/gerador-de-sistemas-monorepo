<?php

$organization = "geradordesistemas";
$organizationPass = "REDACTED_GITHUB_TOKEN";
$gitBaseRepository = 'https://github.com/geradordesistemas/base';

$projectsDirectory = "public/projects/";
$projectsDirectory = "/var/www/html/$projectsDirectory";

$projects = array_diff(scandir($projectsDirectory), array('..', '.', '.gitignore', ".csm_setup_R7KRhaC7H", ".csm_setup_idIsj2aKf"));

foreach ($projects as $projectName){

    $dir = scandir("$projectsDirectory/$projectName");
    if(!in_array("end.txt", $dir))
        continue;

    shell_exec("rm  $projectsDirectory$projectName/end.txt");

    $commands = [
        'rm -rf .git',
        'git init',
        'git add .',
        'git commit -m "First Commit - By Gerador de Sistemas"',
        'git branch -M main',
        "hub delete -y $organization/$projectName",
        'hub create',
        "git push https://$organization:$organizationPass@github.com/$organization/$projectName.git",
    ];

    foreach ($commands as $command)
        shell_exec("(cd $projectsDirectory$projectName/ && $command)");

    shell_exec("rm -rf  $projectsDirectory$projectName");
}




















