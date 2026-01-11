// Tech stack icons mapping using devicon and fontawesome
// Reference: https://devicon.dev/ and https://simpleicons.org/

export const techstackIcons = {
    // Languages
    'Python': 'devicon-python-plain',
    'JavaScript': 'devicon-javascript-plain',
    'TypeScript': 'devicon-typescript-plain',
    'Go': 'devicon-go-plain',
    'Golang': 'devicon-go-plain',
    'Java': 'devicon-java-plain',
    'Rust': 'devicon-rust-plain',
    'C++': 'devicon-cplusplus-plain',
    'C#': 'devicon-csharp-plain',
    'PHP': 'devicon-php-plain',
    'Ruby': 'devicon-ruby-plain',
    'Swift': 'devicon-swift-plain',
    'Kotlin': 'devicon-kotlin-plain',

    // Frontend Frameworks
    'React': 'devicon-react-original',
    'Vue': 'devicon-vuejs-plain',
    'Vue.js': 'devicon-vuejs-plain',
    'Angular': 'devicon-angularjs-plain',
    'Svelte': 'devicon-svelte-plain',
    'Next.js': 'devicon-nextjs-plain',
    'Nuxt': 'devicon-nuxtjs-plain',
    'Nuxt.js': 'devicon-nuxtjs-plain',

    // Backend Frameworks
    'Django': 'devicon-django-plain',
    'Flask': 'devicon-flask-original',
    'FastAPI': 'devicon-fastapi-plain',
    'Express': 'devicon-express-original',
    'Express.js': 'devicon-express-original',
    'Node.js': 'devicon-nodejs-plain',
    'Spring': 'devicon-spring-plain',
    'Laravel': 'devicon-laravel-plain',
    'Rails': 'devicon-rails-plain',
    'Ruby on Rails': 'devicon-rails-plain',
    '.NET': 'devicon-dotnetcore-plain',

    // Databases
    'PostgreSQL': 'devicon-postgresql-plain',
    'MySQL': 'devicon-mysql-plain',
    'MongoDB': 'devicon-mongodb-plain',
    'Redis': 'devicon-redis-plain',
    'SQLite': 'devicon-sqlite-plain',
    'Cassandra': 'devicon-cassandra-plain',
    'DynamoDB': 'devicon-dynamodb-plain',
    'Supabase': 'devicon-supabase-plain',

    // Cloud & DevOps
    'AWS': 'devicon-amazonwebservices-plain-wordmark',
    'GCP': 'devicon-googlecloud-plain',
    'Google Cloud': 'devicon-googlecloud-plain',
    'Azure': 'devicon-azure-plain',
    'Docker': 'devicon-docker-plain',
    'Kubernetes': 'devicon-kubernetes-plain',
    'K8s': 'devicon-kubernetes-plain',
    'Terraform': 'devicon-terraform-plain',
    'Jenkins': 'devicon-jenkins-plain',
    'GitHub Actions': 'devicon-githubactions-plain',
    'GitLab CI': 'devicon-gitlab-plain',
    'Nginx': 'devicon-nginx-original',
    'Apache': 'devicon-apache-plain',

    // Tools & Others
    'Git': 'devicon-git-plain',
    'GitHub': 'devicon-github-original',
    'GitLab': 'devicon-gitlab-plain',
    'VS Code': 'devicon-vscode-plain',
    'Vim': 'devicon-vim-plain',
    'Linux': 'devicon-linux-plain',
    'Ubuntu': 'devicon-ubuntu-plain',
    'Bash': 'devicon-bash-plain',

    // API & Communication
    'GraphQL': 'devicon-graphql-plain',
    'REST API': 'fa-solid fa-plug',
    'REST': 'fa-solid fa-plug',
    'gRPC': 'fa-solid fa-bolt',
    'WebSocket': 'fa-solid fa-satellite-dish',
    'JWT': 'fa-solid fa-key',

    // Firebase & BaaS
    'Firebase': 'devicon-firebase-plain',
    'Firestore': 'devicon-firebase-plain',

    // CSS & Styling
    'CSS': 'devicon-css3-plain',
    'Sass': 'devicon-sass-original',
    'SCSS': 'devicon-sass-original',
    'Tailwind': 'devicon-tailwindcss-plain',
    'Tailwind CSS': 'devicon-tailwindcss-plain',
    'Bootstrap': 'devicon-bootstrap-plain',
    'Material UI': 'devicon-materialui-plain',

    // Testing
    'Jest': 'devicon-jest-plain',
    'Pytest': 'devicon-pytest-plain',
    'Cypress': 'devicon-cypressio-plain',

    // Package Managers
    'npm': 'devicon-npm-original-wordmark',
    'Yarn': 'devicon-yarn-plain',
    'pip': 'devicon-python-plain',

    // Message Queues
    'Kafka': 'devicon-apachekafka-original',
    'RabbitMQ': 'devicon-rabbitmq-plain',
    'NSQ': 'fa-solid fa-message',

    // Monitoring
    'Prometheus': 'devicon-prometheus-original',
    'Grafana': 'devicon-grafana-plain',

    // Default
    'default': 'fa-solid fa-code'
};

export function getTechIcon(tech) {
    return techstackIcons[tech] || techstackIcons['default'];
}
