UX Rocket Clear
==============
Metin alanına yapılan girişleri tek seferde silmek için kullanılmaktadır. Metin kutusuna yazmaya başlandığında kutunun sağ tarafında bir çarpı (x) işareti belirir. Çarpıya basıldığında metin kutusunun içeriği silinir.


```HTML
<input type="text" class="clear-field" placeholder="Birşeyler yazınız" />
<input type="text" class="clear-field" value="Lorem ipsum" placeholder="Birşeyler yazınız" />
```

### Notlar
Clear plugini uygulanmış bütün elemanlar, `uxitd-clear-wrap` classına sahip bir `span` ya da `label`  içerisine konulmaktadır. Çıkacak çarpı işaretinin pozisyonu da bu wrapper elemanına göre tanımlanmaktadır.


### Tanımlar
Property 			 | Default			| Açıklama
-------------------- | ---------------- | --------
cssClass             | .icon-cross      | Silme butonu için kullanılacak ikon simgesini belirler
clearAlso            |  null            | Etkileşimli olarak alan silindiğinde, ek olarak değeri silinecek bağlı başka bir alanı belirler. jQuery seçicisinde kullanmak üzere bir 'selector' tanımlanabilir

Data Attribute			   | &nbsp;
-------------------------- | -----
css-class                  | Silme butonu için kullanılacak ikon simgesini belirler
clear-also                 | Etkileşimli olarak alan silindiğinde, ek olarak değeri silinecek bağlı başka bir alanı belirler. jQuery seçicisinde kullanmak üzere bir 'selector' tanımlanabilir

Callback			 | &nbsp;
-------------------- | -----
onReady              | Clear, form elemanına bağlandığında çalışacak fonksiyonu çağırır.
onClear              | Alan silindiğinde çalışacak fonksiyonu çağırır
onUpdate             | Clear pluginine ait instance güncellendikten sonra çalışacak fonksiyonu çağırır.
onRemove             | Clear pluginine ait instance kaldırıldıktan sonra çalışacak fonksiyonu çağırır.


### Public Metodlar
Method					   | Açıklama
-------------------------- | -------------------------------------------------------
$(selector).clear(options) | Bu method plugini manuel olarak bir elemana bağlamanızı sağlar.
$.uxclear                  | Bu method pluginin detayını görmenizi sağlar.
$.uxclear.update(el)       | Sayfa işlemleri sırasında tanımları değiştirilen elemanlarda pluginin özelliklerinin güncellenmesini sağlar. 
$.uxclear.remove(el)       | Sayfa işlemleri sırasında pluginin eleman üzerinde bağlantısının kaldırılıp, elemanın orjinal durumuna dönmesini sağlar. 
$.uxclear.version          | Sayfaya eklenmiş pluginin versiyon numarasını gösterir.