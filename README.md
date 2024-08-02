# Cyber

Cyber, modern bir web uygulaması şablonudur. Kullanıcı dostu arayüzü ve performans odaklı tasarımı ile öne çıkar. Bu proje, e-ticaret, sosyal medya platformları veya diğer dinamik web uygulamaları için uygun bir temel sağlar. Yüksek performanslı ve esnek yapısı sayesinde, farklı türdeki web projelerinin hızlı ve etkili bir şekilde geliştirilmesine olanak tanır.


## İçindekiler
- [Proje Tanıtım Videosu](#proje-tanıtım-videosu)
- [Kullanılan Teknolojiler](#kullanilan-teknolojiler)
- [Proje Özellikleri](#proje-ozellikleri)
- [Projeyi Başlatma](#projeyi-baslatma)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Admin Özellikleri](#admin-özellikleri)


## Proje Tanıtım Videosu



## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için kullanılan bir JavaScript kütüphanesi. Bileşen tabanlı yapısı sayesinde uygulamanın ölçeklenebilir ve sürdürülebilir olmasını sağlar.
- **Vite**: Hızlı ve modern bir geliştirme aracıdır. React uygulamalarının hızlı bir şekilde oluşturulmasını ve geliştirilmesini sağlar.
- **axios@1.6.8**: HTTP isteklerini yönetmek için kullanılan bir kütüphanedir. Sunucu ile veri alışverişi işlemlerini kolaylaştırır.
- **bootstrap@5.3.3**: Tasarım ve kullanıcı arayüzü bileşenleri için popüler bir CSS framework'tür. Hızlı ve duyarlı bir tasarım geliştirmeye olanak tanır.
- **react-bootstrap@2.10.2**: React ile Bootstrap bileşenlerini entegre eden bir kütüphanedir. Bootstrap'in React uyumlu bileşenlerini sağlar.
- **react-icons@5.2.1**: Popüler simgeleri (icon) React bileşenleri olarak kullanmanıza olanak tanır. Kullanıcı arayüzünde çeşitli simgelerle kolayca çalışabilirsiniz.
- **dotenv@16.4.5**: Çevresel değişkenleri yönetmek için kullanılan bir kütüphanedir. Uygulamanın konfigürasyon bilgilerini güvenli bir şekilde saklamaya yardımcı olur.
- **json-server@1.0.0-beta.0**: API geliştirme sürecinde kullanılan bir araçtır. Sahte bir JSON veritabanı sunarak, gerçek bir API'ye ihtiyaç duymadan uygulama geliştirmeyi kolaylaştırır.
- **react-credit-cards-2@1.0.2**: Kredi kartı bilgilerini görsel olarak göstermek için kullanılan bir React bileşenidir. Kullanıcıların kredi kartı bilgilerini kolayca görüntülemesine olanak tanır.
- **react-router-dom@6.23.0**: React uygulamaları için yönlendirme ve rotalama işlevselliği sağlar. Kullanıcıların farklı sayfalara geçiş yapmasını sağlar.
- **react-toastify@10.0.5**: Kullanıcıya bildirimler göstermek için kullanılan bir kütüphanedir. Uygulama içi bildirimlerin kullanıcı deneyimini iyileştirmesine yardımcı olur.


## Proje Özellikleri

- **Ürün Kataloğu**: Kullanıcıların ürünleri kategorilere göre keşfetmesini sağlar.
- **Sepet Yönetimi**: Kullanıcıların ürünleri sepetlerine ekleyip, çıkarabilmesini ve sepetin içeriğini görüntülemesini sağlar.
- **Kullanıcı Yönetimi**: Kullanıcıların hesap oluşturmasını, giriş yapmasını ve profil bilgilerini yönetmesini sağlar.
- **E-ticaret Özellikleri**: Ürün listeleme, detay sayfaları, sepet ve ödeme işlemleri.
- **Performans Optimizasyonu**: Hızlı yükleme süreleri ve düşük ağ gecikmeleri.


## Projeyi Başlatma
Videoyu izlemek için [buraya tıklayın](https://www.dropbox.com/scl/fi/iayutf1m0ae1bgz5ef3js/CyberProjectVideo.mp4?rlkey=1ckr9l649xvluml30l13h4jb0&st=tkhty58d&dl=0)

### Gereksinimler

- Node.js (ve npm) - [Node.js İndir](https://nodejs.org/)

### Kurulum

1. **Depoyu Kopyalayın**:
   ```bash
   git clone https://github.com/kullaniciadi/cyber.git
   
2. **Bağımlılıkları Yükleyin**:
npm install

3. **.env Dosyasını Oluşturun**:
Proje kök dizininde .env adında bir dosya oluşturun ve aşağıdaki satırı ekleyin:
VITE_API_URL=http://localhost:3000/

4. **Verilerin Gelmesi İçin db.json Dosyasını Çalıştırın**:
npx json-server db.json

5. **Geliştirme Sunucusunu Başlatın**:
npm run dev

6. **Uygulamayı Tarayıcıda Görüntüleyin**:
Web tarayıcınızda http://localhost:3000 adresine gidin.

## Admin Özellikleri
- Admin hesabı kullanıcı adı: admin
- Admin hesabı e-posta: admin@gmail.com
- Admin hesabı şifre: Admin121437qwert!
- Admin panele giriş: /adminpanel 
- Not: Admin panele giriş yapmak için admin hesabı ile girmeniz gerekmektedir.

