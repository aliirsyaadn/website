<script>
    export let techstacks;
</script>

{#each techstacks as tech}
    {#if tech.toUpperCase() === "DOCKER"}
        <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="docker" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "KUBERNETES"}
        <a href="https://kubernetes.io/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-original.svg" alt="kubernetes" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "GO"}
        <a href="https://golang.org" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" alt="go" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "PYTHON"}
        <a href="https://www.python.org" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "JAVASCRIPT"}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "DJANGO"}
        <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg" alt="django" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "SVELTE"}
        <a href="https://svelte.dev" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg" alt="svelte" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "GRAPHQL"}
        <a href="https://graphql.org" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg" alt="graphql" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "GRPC"}
        <a href="https://grpc.io/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/grpc/grpc-original.svg" alt="grpc" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "MYSQL"}
        <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="mysql" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "POSTGRESQL"}
        <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "FIREBASE"}
        <a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" alt="firebase" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "REDIS"}
        <a href="https://redis.io" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" alt="redis" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "ELASTICSEARCH"}
        <a href="https://www.elastic.co/elasticsearch/" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/elasticsearch/elasticsearch-original.svg" alt="elasticsearch" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "JENKINS"}
        <a href="https://www.jenkins.io" target="_blank" rel="noreferrer"> 
            <img src="https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" alt="jenkins" width="40" height="40"/> 
        </a>
    {:else if tech.toUpperCase() === "NGINX"}
        <a href="https://www.nginx.com" target="_blank" rel="noreferrer"> 
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> 
        </a>
    {/if}
{/each}