import styles from "./HomePage.module.css"; // Agar stil kerak bo'lsa

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1>Junior Software Engineer Texnik Suhbatlariga Tizimli Tayyorgarlik</h1>
      <p>
        Software Engineering sohasida o'z karyerasini boshlayotganlar uchun
        mo‘ljallangan ushbu keng qamrovli resursga xush kelibsiz. Ushbu
        platforma turli yo‘nalishlardagi texnologiyalar uchun eng muhim va
        dolzarb texnik intervyu savollarini markazlashtirish maqsadida ishlab
        chiqilgan.
      </p>
      <p>
        Texnologiyalar shiddat bilan rivojlanayotgan davrda, texnik suhbatlarga
        puxta tayyorgarlik ko‘rish muvaffaqiyatli karyeraning poydevoridir. Bu
        yerda siz tanlagan mavzu bo'yicha bilimlaringizni sinovdan o‘tkazish,
        mustahkamlash va chuqurlashtirish imkoniyatiga ega bo‘lasiz.
      </p>

      <h2>Platformadan Foydalanish Yo‘riqnomasi:</h2>
      <p>
        Navigatsiya panelidan o'zingizga kerakli texnologiya (`mavzu`) bo‘limini
        tanlang. Tanlangan bo‘limda tegishli intervyu savollari ro‘yxati
        keltirilgan. Har bir savolga murojaat qilib, uning batafsil tahlili,
        fundamental tushuntirishlar, amaliy kod namunalari va intervyu uchun
        tavsiya etilgan javob formatini ko‘rishingiz mumkin bo‘ladi.
      </p>

      <p className={styles.emphasis}>
        Muntazam tayyorgarlik va chuqur tushuncha — bu sizning texnik
        suhbatlardagi muvaffaqiyatingiz garovidir. Ushbu resurs sizning
        professional engineering ko'nikmalaringizni rivojlantirishga hissa
        qo‘shishiga ishonamiz.
      </p>
    </div>
  );
}

export default HomePage;
