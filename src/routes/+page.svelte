<script>
  let user = "User";
  let org = "Org";
  let role = "Role";
</script>

<div class="min-h-screen flex bg-gray-200">
  <!-- Sidebar -->
  <aside class="w-60 bg-indigo-900 text-white p-6 flex flex-col gap-8">
    <div class="text-lg font-semibold">Team Task Manager</div>

    <nav class="flex flex-col gap-2 text-sm">
      <a href="#" class="hover:text-gray-300">Pages</a>
      <a href="#" class="hover:text-gray-300">Pages</a>
      <a href="#" class="hover:text-gray-300">Pages</a>
    </nav>
  </aside>

  <!-- Main -->
  <main class="flex-1 p-8 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-semibold">Welcome, {user}!</h1>
      <p class="text-sm text-gray-500">{org} | {role}</p>
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