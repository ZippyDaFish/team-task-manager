<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUserWithOrg } from "$lib/firestore/userWithOrg";
    import type { UserWithOrg } from "$lib/firestore/types";
    import { getProjectsByOrg } from "$lib/firestore/projects";
    import type { Project } from "$lib/firestore/projects";

    let user = "User";
    let org = "Org";
    let role = "Role";

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
                <a href="#" class="hover:text-gray-300">{project.name}</a>
            {/each}
        {/if}
    </nav>
    </aside>

  <!-- Main -->
  <main class="flex-1 p-8 space-y-6">
    <!-- Header -->
    <div>
      {#if loading}
        <h1 class="text-xl font-semibold">Loading...</h1>
        <p class="text-sm text-gray-500">Please wait</p>
      {:else if error}
        <h1 class="text-xl font-semibold text-red-500">Error</h1>
        <p class="text-sm text-gray-500">{error}</p>
      {:else}
        <h1 class="text-xl font-semibold">Welcome, {user}!</h1>
        <p class="text-sm text-gray-500">{org} | {role}</p>
      {/if}
    </div>

    <!-- Top cards -->
    <div class="grid grid-cols-4 gap-6 w-4/5">
      <div class="h-40 bg-white rounded-xl shadow"></div>
      <div class="h-40 bg-white rounded-xl shadow"></div>
      <div class="h-40 bg-white rounded-xl shadow"></div>
      <div class="h-40 bg-white rounded-xl shadow"></div>
    </div>

    <!-- Middle -->
    <div class="grid grid-cols-2 gap-6">
      <div class="h-90 bg-white rounded-xl shadow"></div>
      <div class="h-90 bg-white rounded-xl shadow"></div>
    </div>

    <!-- Bottom -->
    <div class="grid grid-cols-2 gap-6">
      <div class="h-60 bg-white rounded-xl shadow"></div>
      <div class="h-60 bg-white rounded-xl shadow"></div>
    </div>
  </main>
</div>