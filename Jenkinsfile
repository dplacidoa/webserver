pipeline {
  environment {
    registry = "registry.gitlab.com/david.placido/ansible"
    registryCredential = 'david.placido.gitlab'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/dplacidoa/webserver.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Push Image') {
      steps{
        script {
          docker.withRegistry( 'https://registry.gitlab.com', registryCredential ) {
            dockerImage.push("$BUILD_NUMBER")
          }
        }
      }
    }
    stage('Deploy container') {
      steps {
            ansiblePlaybook installation: 'Ansible', inventory: 'hosts.inv', playbook: 'deploy_docker.yml'      
        }
    }
  }
}
