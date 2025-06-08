# Bursa Sıcaklık Uygulaması

Bu uygulama, Bursa'nın anlık sıcaklık ve hava durumu bilgilerini gösteren bir React Native uygulamasıdır.

## Özellikler

- Bursa'nın anlık sıcaklık bilgisi
- Nem ve rüzgar hızı bilgileri
- Her 5 dakikada bir otomatik güncelleme
- Manuel yenileme özelliği
- Hata durumunda kullanıcı bilgilendirmesi
- Şık ve kullanıcı dostu arayüz

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/mrvblgn/BursaTemeperatureApp.git
cd BursaTemperatureApp
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. OpenWeather API anahtarınızı alın:
- [OpenWeather](https://openweathermap.org/api) sitesine gidin
- Ücretsiz hesap oluşturun
- API anahtarınızı alın
- `services/weatherService.ts` dosyasındaki `API_KEY` değişkenini kendi API anahtarınızla güncelleyin

4. Uygulamayı başlatın:
```bash
npx expo start
```

## Kullanılan Teknolojiler

- React Native
- Expo
- OpenWeather API
- Axios
- TypeScript

## Geliştirme

Uygulama geliştirme için aşağıdaki komutları kullanabilirsiniz:

```bash
# Geliştirme sunucusunu başlat
npx expo start

# iOS simülatöründe çalıştır
npx expo start --ios

# Android emülatöründe çalıştır
npx expo start --android
```

## Lisans

MIT
