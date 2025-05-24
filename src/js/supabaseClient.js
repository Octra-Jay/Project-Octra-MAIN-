// Supabase-Client initialisieren (setze deine URL und Key ein)
const supabase = Supabase.createClient('https://deine-supabase-url.supabase.co', 'dein-anon-key');

// Website-Statistiken laden
async function loadWebsiteStats() {
  try {
    const { data: stats, error } = await supabase
      .from('website_stats')
      .select('projects_count, users_count, partners_count, server_uptime, api_calls, page_views')
      .single();
    if (error) throw error;

    const websiteStats = document.getElementById('website-stats');
    websiteStats.innerHTML = `
      <ul class="space-y-4">
        <li><strong>Projekte:</strong> ${stats.projects_count || '100+'}</li>
        <li><strong>Nutzer:</strong> ${stats.users_count || '10.000+'}</li>
        <li><strong>Partner:</strong> ${stats.partners_count || '50+'}</li>
        <li><strong>Server-Uptime:</strong> ${stats.server_uptime || '99,9%'}</li>
        <li><strong>API-Calls (letzte 30 Tage):</strong> ${stats.api_calls || '1.000.000'}</li>
        <li><strong>Seitenaufrufe:</strong> ${stats.page_views || '500.000'}</li>
      </ul>
    `;
  } catch (error) {
    console.error('Fehler beim Laden der Website-Statistiken:', error);
  }
}

// Profil-Statistiken laden
async function loadProfileStats() {
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Nicht eingeloggt');

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('username, created_projects, posts, profile_views, created_at, last_active')
      .eq('id', user.id)
      .single();
    if (error) throw error;

    const profileStats = document.getElementById('profile-stats');
    profileStats.innerHTML = `
      <ul class="space-y-4">
        <li><strong>Benutzername:</strong> ${profile.username || '[Dein Name]'}</li>
        <li><strong>Erstellte Projekte:</strong> ${profile.created_projects || 5}</li>
        <li><strong>Beiträge:</strong> ${profile.posts || 20}</li>
        <li><strong>Profil-Aufrufe:</strong> ${profile.profile_views || 100}</li>
        <li><strong>Mitglied seit:</strong> ${new Date(profile.created_at).toLocaleDateString('de-DE') || 'Januar 2025'}</li>
        <li><strong>Letzte Aktivität:</strong> ${new Date(profile.last_active).toLocaleDateString('de-DE') || '24. Mai 2025'}</li>
      </ul>
    `;
  } catch (error) {
    console.error('Fehler beim Laden der Profil-Statistiken:', error);
    document.getElementById('profile-stats').innerHTML = '<p class="text-red-400">Bitte melde dich an, um deine Statistiken zu sehen.</p>';
  }
}

// Statistiken beim Laden der Seite abrufen
document.addEventListener('DOMContentLoaded', () => {
  loadWebsiteStats();
  loadProfileStats();
});