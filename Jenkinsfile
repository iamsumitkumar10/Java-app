
pipeline {
    agent any
    tools {
      nodejs 'NodeJS'
    }
    environment {
        NODE_VERSION = "18"
        KUBECONFIG = '/home/sumit/.kube/config'
    }
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                git branch: 'main', credentialsId: '44843b6c-26e6-4564-bcf0-dc2bda0b9e7f', 
                url: 'https://github.com/iamsumitkumar10/ '
            }
        }

        stage('Setup NodeJs') {
            steps {
                sh "npm install"
            }
        }

        stage('Build Project') {
            steps {
                script {
                    echo "Building project..."
                    sh "npm run build"
                }
            }
        }

        stage('docker push'){
            steps{
                script {
                    withDockerRegistry(
                        credentialsId: '0bfdb452-e0b6-40bb-ac8a-ba599be5f55f', 
                        url: 'https://index.docker.io/v1/'
                    ){
                        echo "🐳 Building Docker image..."
                        sh 'docker build -t iamsumitkumar/sk-portfolio:$BUILD_ID .'

                        echo "📤 Pushing Docker image..."
                        sh 'docker push iamsumitkumar/sk-portfolio:$BUILD_ID'

                    } 
                }
            }
        }
        stage('minikube-deployment') {
            steps {
                script {
                    dir('kubernetes') {
                        try {
                            sh 'kubectl apply -f deployment.yaml'
                            sh 'kubectl apply -f services.yaml'
                            sh 'kubectl apply -f ingress.yaml'
                        } catch (err) {
                            echo "Deployment failed: ${err}"
                            error("Aborting pipeline due to deployment failure.")
                        }
                    }
                }
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
            emailext(
                subject: 'this mail from sk-portfolio build id ${BUILD_ID}',
                body: '''Build is successfully.
Build URL is : ${BUILD_URL}
                ''',
                from: 'sumitkumar703327@gmail.com',
                to: 'work.sumit10@gmail.com'
            )
        }
        failure {
            echo '❌ Pipeline failed. Check the logs for details.'
            emailext(
                subject: 'this mail from jenkins build id ${BUILD_ID}',
                body: '''Build is failed. 
Build URL is : ${BUILD_URL}
                ''',
                from: 'sumitkumar703327@gmail.com',
                to: 'work.sumit10@gmail.com'
            )
        }
        always {
            echo '📋 Pipeline execution finished.'
        }
    }
}
