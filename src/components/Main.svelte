<script>
    import Project from "./Project.svelte";
    import Experience from "./Experience.svelte";
    import Contact from "./Contact.svelte";
    import Techstack from "./Techstack.svelte";

    let projects = [
        {
            name: "SID Malang Medina City",
            icon: "fa-solid fa-diagram-project",
            title: "Information system for internal dashboard of Malang Medina City.",
            description: "Planning, designing, and developing a web-based information system for internal use, including a dashboard for monitoring and managing data. Developed with Python (Django)",
            techstacks: ["PYTHON", "DJANGO", "POSTGRESQL", "FIREBASE"],
        },
        {
            name: "Proyekin",
            icon: "fa-solid fa-puzzle-piece",
            title: "Freelancer web platform for Fasilkom UI",
            description: "Developed and implemented a Golang API with Design Pattern for efficient services, including notification and chat room endpoints, alongside PostgreSQL queries for data accuracy.",
            techstacks: ["GO", "POSTGRESQL",],
        },
        {
            name: "Reviewin",
            icon: "fa-solid fa-list-check",
            title: "Peer-based CV Review Platform",
            description: "Developed a GraphQL API backend with seamless integration, implemented JWT-based authentication for secure access, and created a cron program for data synchronization, ensuring constant data accuracy.",
            techstacks: ["GO", "POSTGRESQL", "GRAPHQL", "NGINX"],
        },
    ];

    let experiences = [
        {
            number: 1,
            company: "Paper.id - Fulltime",
            href: "https://paper.id",
            role : "Software Engineer II",
            period: "July 2024 - Present",
            description:
                "Served as Software Engineer II at Paper.id, developing microservices for a rapidly scaling SaaS platform. Collaborated cross-functionally to ensure seamless integration and utilized cutting-edge tools to optimize performance and reliability, while maintaining a focus on scalability and reliability.",
            techstacks: ["GO", "MYSQL", "REDIS", "DOCKER", "KUBERNETES",],
        },
        {
            number: 2,
            company: "Mindtera - Fulltime",
            href: "https://mindtera.com",
            role : "Software Engineer",
            period: "December 2022 - July 2024",
            description:
                "Leading development and maintenance of a nine-service microservice for a rapidly scaling SaaS platform, collaborating cross-functionally for seamless integration, and utilizing cutting-edge tools to optimize performance and reliability.",
            techstacks: ["GO", "GRPC", "POSTGRESQL", "REDIS", "DOCKER", "KUBERNETES",],
        },
        {
            number: 3,
            company: "Tokopedia - Internship & Fulltime",
            href: "https://tokopedia.com",
            role: "Software Engineer",
            period: "August 2021 - November 2022",
            description:
                "I created a Golang-based agent integration project for Tokopedia, expanding offerings, synchronized data between ElasticSearch and MySQL using NSQ for consistency, conducted unit and integration testing (GQL, gRPC), and monitored deployments with NewRelic and Jenkins for quality assurance.",
            techstacks: ["GO", "GRPC", "GRAPHQL", "MYSQL", "POSTGRESQL", "REDIS", "ELASTICSEARCH", "JENKINS", "NGINX"],
        },
        {
            number: 4,
            company: "SayaKaya - Internship",
            href: "https://sayakaya.id",
            role: "Fullstack Engineer",
            period: "June 2021 - August 2021",
            description:
                "Built a <strong class='text-blue-500'>GraphQL API</strong> backend in Golang for a financial planner feature, implemented JWT authentication, and crafted a user-friendly admin dashboard with SvelteJS for seamless scheduling and management of financial plans.",
            techstacks: ["GO", "JAVASCRIPT", "SVELTE", "POSTGRESQL", "GRAPHQL",],
        },
    ]

    let benefits = [
        {
            name: "Experienced Backend Engineer",
            description:
                "I'm a seasoned software engineer specializing in backend development. Proficient in Go and SQL databases, I excel in building and maintaining robust backend applications. With strong problem-solving skills and natural leadership abilities, I'm passionate about leveraging technology to create innovative solutions.",
        },
        {
            name: "Passionate Self-Taught Developer",
            description:
                "I'm a self-taught developer passionate about tech. I thrive on solving coding puzzles and bridging communication gaps between teams",
        },
        {
            name: "An excellent communicator",
            description:
                "Communication is key and it's a paramount value of mine. I believe in transparency and constructive communication above all else. This helps me develop deep relationships and ensures my effectiveness and productivity in any work space with any team.",
        },
    ];
</script>

<main class="flex flex-col flex-1 p-4">
    <section
        id="introPage"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14"
    >
        <div
            class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
        >
            
            <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Hi! I'm <span class="poppins text-blue-500">Ali Irsyaad </span>,
                <br /> 
                a <span class="poppins text-blue-500">Software</span> Engineer
            </h2>
            <p class="text-base sm:text-lg md:text-xl">
             Specializing in <span class="text-blue-500"> Backend Engineer</span> with Go and Python.
             <br>
            </p>
            <div class="flex justify-center lg:justify-start ">
                <Contact />
              </div>
        </div>
        <div class="relative grid place-items-center">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
                src={"images/profile.png"}
                alt="Profile Picture of Ali Irsyaad"
                class="object-cover z-[2] max-h-[70vh]"
            />
        </div>
    </section>
    <section class="py-20 lg:py-32 flex flex-col gap-24" id="experiences">
        <div class="flex flex-col gap-2 text-center">
            <!-- <h6 class="text-large sm:text-xl md:text-2xl">
                A few of my creative endeavors.
            </h6> -->
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                My <span class="poppins text-blue-500">Career</span> Journey
            </h3>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-10">
            {#each experiences as experience}
                <Experience data={experience} > 
                    <Techstack techstacks={experience.techstacks} />
                </Experience>
            {/each}

        </div>
    </section>
    <section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
        <div class="flex flex-col gap-2 text-center">
            <!-- <h6 class="text-large sm:text-xl md:text-2xl">
                A few of my creative endeavors.
            </h6> -->
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                My <span class="poppins text-blue-500">Project</span> Portfolio
            </h3>
        </div>
        <!-- <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            class="mx-auto px-4 py-2 rounded-md border border-solid border-white flex items-center gap-2 -mb-4 sm:-mb-0 -mt-10 hover:border-blue-700 duration-200"
        >
            <i class="fa-regular fa-circle-play" />
            <p>Watch the video</p>
        </a> -->
        <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-10">

            {#each projects as project}
                <Project data={project} > 
                    <Techstack techstacks={project.techstacks} />
                </Project>
            {/each}
            
        </div>
    </section>
    <section
        id="about"
        class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
    >
        <div
            class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-blue-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-blue-700 py-4"
        >
            <h6 class="text-large sm:text-xl md:text-2xl">
                Want to know more?
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                A bit <span class="poppins text-blue-500">about</span> me.
            </h3>
        </div>
        <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">
            I am . . .
        </p>
        <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
            {#each benefits as benefit, index}
                <div class="flex gap-6 sm:gap-8">
                    <p
                        class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold"
                    >
                        0{index + 1}
                    </p>
                    <div class="flex flex-col gap-6 sm:gap-8">
                        <h3 class="text-2xl sm:text-3xl md:text-5xl">
                            {benefit.name}
                        </h3>
                        <p>{benefit.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</main>
