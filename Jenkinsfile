pipeline {
  agent any
  stages {
    stage('') {
      steps {
        sh '''npm install
npm run build
rm /var/www/* -rf
cp ${WORKSPACE}/dist/* /var/www -r'''
      }
    }

  }
}