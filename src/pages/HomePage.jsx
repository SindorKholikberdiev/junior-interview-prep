import styles from './HomePage.module.css'; // Agar stil kerak bo'lsa

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1>Junior Dasturchi Intervyu Savollariga Xush Kelibsiz!</h1>
      <p>
        Bu loyiha frontend yo'nalishidagi, ayniqsa junior dasturchilar uchun eng muhim va dolzarb intervyu savollarini bir joyga to'plash maqsadida yaratilgan.
      </p>
      <p>
        Texnologiyalar jadal rivojlanayotgan bugungi kunda ishga kirish uchun suhbatlardan muvaffaqiyatli o'tish har qachongidan ham muhimroq. Ushbu platforma sizga HTML, CSS, JavaScript, React va boshqa zamonaviy texnologiyalar bo'yicha bilimlaringizni sinab ko'rish va mustahkamlashga yordam beradi.
      </p>
      <h2>Qanday foydalanish kerak?</h2>
      <p>
        Chap tomondagi menyudan o'zingizni qiziqtirgan mavzuni tanlang. Shundan so'ng, o'sha mavzuga oid savollar ro'yxati paydo bo'ladi. Har bir savolni bosish orqali uning batafsil javobini, kod misollarini va intervyu uchun qisqa javob variantini ko'rishingiz mumkin.
      </p>
      <p>
        Omad yor bo'lsin!
      </p>
    </div>
  );
}

export default HomePage;
