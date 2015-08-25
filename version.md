## Versiyon 1.0.0
- YENİ: Namespaceler `$.uxrclear` olarak değiştirildi
- YENİ: Fonksiyonlar prototype üzerinden çağrılacak şekilde değiştirildi.

## Versiyon 0.9.0
- YENİ: `$.uxclear.update(el)` metodu eklendi. Dom değişikliği sonrasında plugin bağlantılarını güncellemek için kullanılabilir.
- YENİ: `$.uxclear.remove(el)` metodu eklendi. Değişiklik ya da iptal için plugin bağlantılarını kaldırıp, elemanı orjinal durumuna döndürmek için kullanılabilir.
- YENİ: `onUpdate` callbacki eklendi.
- YENİ: `onRemove` callbacki eklendi.
- DEĞİŞİKLİK: Statik olarak tanımlanmış değişken ve class isimleri parametrik hale getirildi.

## Versiyon 0.8.0
- YENİ: Input ve silme işlemleri için kontrol edilen "event" uxClear namespacei içine eklendi.

## Versiyon 0.7.2a (non-release)
- YENİ: Yeni tanımlanmaya başlayan, elemana bağlanmış uxRocket plugin listesi kontrolleri eklendi.

## Version 0.7.2
- FIX: missing selector added

## Version 0.7.1
- FIX: opts values now passing through the data('uxSelect').

## Version 0.7.0
- NEW: The selector class and ready class started to removed from wrapper classes.
- CHANGE: When more than one UX Rocket plugin applied, the "opts" data mixed with other plugins and become useless. The opts-data name changed to uxSelect. 

## Version 0.6.2
- FIX: When both clear plugin and any other UX Rocket plugin with icon addition applied to field, overlapping clear icon and other plugin's icon position fixed.

## Version 0.6.1
- FIX: Wrapper is excluded from the plugin binding routine

## Version 0.6.0
- CHANGE: Input's all classes now added to uxitd-plugin-wrap after binding.
- CHANGE: `witdh: auto;` removed from `.uxitd-clear-wrap` definition
