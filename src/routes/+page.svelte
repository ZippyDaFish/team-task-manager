<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUserWithOrg } from "$lib/firestore/userWithOrg";
    import type { UserWithOrg } from "$lib/firestore/types";
    import { getProjectsByOrg } from "$lib/firestore/projects";
    import type { Project } from "$lib/firestore/projects";
    import type { Task } from "$lib/firestore/tasks";
    import { getTasksByProject } from "$lib/firestore/tasks";

    import MainPanel from "../lib/MainPanel.svelte";

    let user = "User";
    let org = "Org";
    let role = "Role";

    let selectedProject: Project | null = null;

    let loading = true;
    let error: string | null = null;

    const uid = "8QieG9fHFhyJWWx52GNv";

    onMount(async () => {
        try {
        const data: UserWithOrg | null = await fetchUserWithOrg(uid);
        if (data) {
            user = data.user.name;
            org = data.org ? data.org.name : "No Org";
            role = data.user.role || "No Role";
        }
        } catch (err) {
        console.error(err);
        error = "Failed to load user data";
        } finally {
        loading = false;
        }
    });

    let currentOrgId = "hCPHtjdGWd1ez2BjqesG";
    let projects: Project[] = [];

    onMount(async () => {
        try {
        projects = await getProjectsByOrg(currentOrgId);
        } catch (err) {
        console.error(err);
        error = "Failed to load projects";
        } finally {
        loading = false;
        }
    });

    let tasks: Task[] = [];
    let tasksLoading = false;

    let lastProjectId: string | null = null;

    $: if (selectedProject?.id && selectedProject.id !== lastProjectId) {
        lastProjectId = selectedProject.id;
        loadTasks(selectedProject.id);
    }

    async function loadTasks(projectId: string) {
        tasksLoading = true;
        try {
            tasks = await getTasksByProject(projectId);
        } catch (err) {
            console.error(err);
            error = "Failed to load tasks";
        } finally {
            tasksLoading = false;
        }
    }
</script>

<div class="min-h-screen flex bg-gray-200">
    <!-- Sidebar -->
    <aside class="w-60 bg-indigo-900 text-white p-6 flex flex-col gap-8">
      <div class="text-lg font-semibold">Team Task Manager</div>

      <nav class="flex flex-col gap-2 text-sm">
          {#if loading}
              <span>Loading projects...</span>
          {:else if error}
              <span class="text-red-300">{error}</span>
          {:else if projects.length === 0}
              <span>No projects</span>
          {:else}
            {#each projects as project}
                <button
                    on:click={() => (selectedProject = project)}
                    class={`text-left hover:text-gray-300 ${
                        selectedProject?.id === project.id ? "font-bold text-gray-900 bg-gray-200 w-60 hover:text-gray-900" : ""
                    }`}
                >
                    {project.name}
                </button>
            {/each}
          {/if}
      </nav>
    </aside>

    <MainPanel {loading} {error} {user} {org} {role} {selectedProject}/>
    {#if tasksLoading}
        <p>Loading tasks...</p>
    {:else if tasks.length === 0}
        <p>No tasks for this project</p>
    {:else}
        <ul>
            {#each tasks as task}
                <li>{task.name}</li>
            {/each}
        </ul>
    {/if}
</div>