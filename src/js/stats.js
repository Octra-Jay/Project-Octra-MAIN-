document.addEventListener('DOMContentLoaded', () => {
  const supabase = Supabase.createClient(
    '',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bmp5cGR3bmR0aWd1d21ucm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUyNDUsImV4cCI6MjA2MzYxMTI0NX0.e1Zu_yf3ojHn9Vgq0stAKzBCZ69pWFt3fY0IHgVY748'
  );
  
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
    animateCounter(document.getElementById('users-online'), 0, usersOnline.length, 2000);
    
    const { data: adminsOnline } = await supabase
      .from('profiles')
      .select('id')
      .eq('online_status', true)
      .eq('is_admin', true);
    animateCounter(document.getElementById('admins-online'), 0, adminsOnline.length, 2000);
    
    animateCounter(document.getElementById('server-count'), 0, 56, 2000);
    animateCounter(document.getElementById('code-lines'), 0, 12750, 2000);
  }
  
  updateStats();
  
  supabase
    .channel('profiles')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, () => {
      updateStats();
    })
    .subscribe();
});