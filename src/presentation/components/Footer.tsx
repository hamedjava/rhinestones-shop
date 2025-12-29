import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-6">زمــرد</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            ارائه دهنده لوکس‌ترین جواهرات با ضمانت اصالت و کیفیت. زیبایی را با ما تجربه کنید.
          </p>
          <div className="flex gap-4">
             <Instagram className="cursor-pointer hover:text-secondary"/>
             <Twitter className="cursor-pointer hover:text-secondary"/>
             <Facebook className="cursor-pointer hover:text-secondary"/>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">دسترسی سریع</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-secondary transition">درباره ما</a></li>
            <li><a href="#" className="hover:text-secondary transition">تماس با ما</a></li>
          </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">عضویت در خبرنامه</h3>
           <div className="flex mt-4">
             <input type="email" placeholder="ایمیل..." className="bg-white/5 border border-white/10 px-4 py-2 w-full outline-none text-white" />
             <button className="bg-secondary text-primary font-bold px-4 hover:bg-white transition">ارسال</button>
           </div>
        </div>
      </div>
      <div className="text-center text-gray-600 border-t border-white/5 pt-8 text-sm">
        © 1403 تمام حقوق برای جواهری زمرد محفوظ است.
      </div>
    </footer>
  );
}