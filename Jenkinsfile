pipeline {
  environment {
    registry = "3.136.118.102:5000/repo_entelgy"
    registryCredential = 'dockerprivate'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ElmerYDQ/webserver-express.git'
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
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push(":$BUILD_NUMBER")
            dockerImage.push(":latest")
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
    stage('Deploy App on Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "app-prueba.yml", kubeconfigId: "kubeconfig")
        }
      }
    }
  }
}
