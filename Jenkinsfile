pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = 'dashboard'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
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
                echo 'Building Docker images...'
                sh 'docker-compose build --no-cache'
            }
        }
        
        stage('Start Services') {
            steps {
                echo 'Starting services...'
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
                    echo 'Checking deployment status...'
                }
            }
        }
    }
    
    post {
        success {
            echo '🎉 Deployment successful!'
            echo '📱 Frontend: http://localhost:5173'
            echo '🔧 Backend: http://localhost:5000'
        }
        failure {
            echo '❌ Deployment failed!'
            sh 'docker-compose logs || true'
        }
        cleanup {
            sh 'docker image prune -f || true'
        }
    }
}