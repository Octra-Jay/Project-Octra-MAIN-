document.addEventListener('DOMContentLoaded', () => {
  const supabase = window.supabase.createClient(
    'https://bvnjypdwndtiguwmnrmm.supabase.co', // Ersetze mit deiner Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bmp5cGR3bmR0aWd1d21ucm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUyNDUsImV4cCI6MjA2MzYxMTI0NX0.e1Zu_yf3ojHn9Vgq0stAKzBCZ69pWFt3fY0IHgVY748'      // Ersetze mit deinem Anon Key
  );

  // Debugging: Prüfe Supabase
  if (!window.supabase) {
    console.error('Supabase-Bibliothek nicht geladen');
    return;
  }
  console.log('Supabase für Statistiken initialisiert');

  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  async function updateStats() {
    const { data: usersOnline } = await supabase
      .from('profiles')
      .select('id')
      .eq('online_status', true);
    const usersOnlineElement = document.getElementById('users-online');
    if (usersOnlineElement) {
      animateCounter(usersOnlineElement, 0, usersOnline.length, 2000);
    }

    const { data: adminsOnline } = await supabase
      .from('profiles')
      .select('id')
      .eq('online_status', true)
      .eq('is_admin', true);
    const adminsOnlineElement = document.getElementById('admins-online');
    if (adminsOnlineElement) {
      animateCounter(adminsOnlineElement, 0, adminsOnline.length, 2000);
    }

    const serverCountElement = document.getElementById('server-count');
    if (serverCountElement) {
      animateCounter(serverCountElement, 0, 56, 2000);
    }
    const codeLinesElement = document.getElementById('code-lines');
    if (codeLinesElement) {
      animateCounter(codeLinesElement, 0, 12750, 2000);
    }
  }

  updateStats();

  supabase
    .channel('profiles')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, () => {
      updateStats();
    })
    .subscribe();
});