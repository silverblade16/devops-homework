pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = 'my-app'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/silverblade16/devops-homework.git'
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    sh '''
                        if [ ! -f .env ]; then
                            echo "PORT=5000" > .env
                        fi
                    '''
                }
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                script {
                    sh 'docker-compose down --remove-orphans || true'
                }
            }
        }
        
        stage('Clean Old Images') {
            steps {
                script {
                    sh 'docker-compose down --rmi local || true'
                }
            }
        }
        
        stage('Build Images') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }
        
        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        
        stage('Wait for Services') {
            steps {
                script {
                    sh 'sleep 10'
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    sh 'docker-compose ps'
                    sh 'docker-compose logs --tail=50'
                    
                    def backendStatus = sh(
                        script: 'docker-compose ps backend | grep -i "up" || echo "down"',
                        returnStdout: true
                    ).trim()
                    
                    def frontendStatus = sh(
                        script: 'docker-compose ps frontend | grep -i "up" || echo "down"',
                        returnStdout: true
                    ).trim()
                    
                    if (!backendStatus.contains('up')) {
                        error('Backend is not running')
                    }
                    if (!frontendStatus.contains('up')) {
                        error('Frontend is not running')
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
            echo 'Frontend: http://localhost:5173'
            echo 'Backend: http://localhost:5000'
        }
        failure {
            echo 'Deployment failed. Printing logs...'
            sh 'docker-compose logs --tail=100 || true'
        }
        cleanup {
            sh 'docker image prune -f || true'
        }
    }
}