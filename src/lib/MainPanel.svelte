<script lang="ts">
    let { loading, error, user, org, role } = $props();
</script>

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