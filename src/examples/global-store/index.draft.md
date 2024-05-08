Всім привіт, мене звати Віталій Рубан, я працюю в компанії Ітера і сьогодні, у нас рубрика React Code Smell в якій ми поговоримо про поширені помилки у використанні глобальних сторів на прикладі нашого улюбленого Redux.

Ми поговоримо про помилки проектування стору, читання зі стору та запису в стор. 

Ми поговоримо про використання локальних та умовно локальних стейтів у сторі, некоректне використання useSelector, надмірне використання стору, та його переускладнненя.

Але перед тим як ми перейдемо до відео короткий дисклеймер: Все що ви побачите в цьому відео - написано умисно погано задля демонстрації, не повторюйте це на реальних проектах.

Отже, починаємо.

В якості прикладу я підготував невеликий застосунок на дві сторінки. На першій сторінці у мене ТОП-5 ігор за версією метакритик з можливістю пошуку. Кожна гра має опис та посилання на досягнення - які ведуть на іншу сторінку. Ще є умовна навігація з умовним користувачем. Як бачите все просто і навіть начебто працює. Тепер давайте подивимось на код.

Код складається з:

- лейауту в якому ініціалізується стор, лежить навігація та аутлет
- глобального стору написаного за допомогою react-toolkit
- сторінки gamePage з відповдіними компонентами
- сторінки achievements з відповідними компонентами

Коду в нас не багато, а от код-смелів вистачає, то ж, переходимо до них. Почнемо з найбільш очевидного - збереження локального стану в глобальному стейті.


## Збереження локального стану в глобальному стейті

Код смелл № 1 - Збереження локального стану в глобальному стейті

Маємо комопонент експанд коллапс, який відмальовує опис гри і використовує глобальний стор для збереження свого стану. Давайте на секунду зробимо паузу і подумаємо, які проблеми це нам приносить?

ПАУЗА

Особисто я бачу тут декілька проблем.

По-перше, загальний компонент більше не є самостійним. Ми не можемо просто так взяти і перевикористати його, оскільки він обов'язково потребує конкретний стор і конкретний ред'юсер для своєї роботи. Збільшується зв'язність коду.

По-друге, стан цього компоненту відкритий усьому світу - будь-хто може змінити цей стан за допомогою ред'юсеру toggleExpandedReducer. Порушується інкапсуляція.

По-третє, у нас ускладнюється глобальний стор. Коду стає більше, читати стає складніше, вірогідність щось зламати зростає. Код стає більш крихким.

В-четверте - перформанс. Використання глобального стору завжди дорожче за локальний.

Виправити це просто - достатньо використасти звичайний useState замість глобального стору. Це просте рішення вирішує всі перелічені проблеми одразу. Не нехтуйте useState, він і досі чудовий.

<!-- А що, якщо нам все ж таки потрібне керування коллапсом з геть іншої частини застосунку? В такому разі буде доцільно перемістити логіку зі стейтом у компонент враппер. Та -->


## Код смелл № 2 - робота з формою через redux

Другий код смелл дуже схожий на перший, але відрізняється тим більшою небезпекою з точки зору швидкодії. Якщо ви робити dispatch на кожну зміну поля в формі, це може призвести до перерендеру усього застосунку на кожний натиск кнпоки. Яким би швидким реакт не був, не факт що він зможе це витримати і ваші інпуту просто почнуть тормозити. Дуже не приємно, коли ти натискаєш на кнопку клавіатури а ще 300 мілісекунд нічого не вібдбувається. 

Рішення тут дуже просте. Поки користувач заповнює форму - ми зберігаємо її дані локально. Коли ж він робить сабміт - ми відправляємо їх за призначенням, або в глобальний стор, якщо ці дані десь потрібні ще, або просто на сервер, якщо не потрібні. І все. 

## Код смелл №3 - збереження псевдолокального стану в глобальному сторі. 

Наступний приклад більш цікавий та складний. На сторінці game я маю компонент search, який записує ключове слово для пошуку в глобальний стор і фільтрує ігри по цьому ключовому слову.

На цій самій сторінці я маю компонент GamesPage який отримує відфільтровані ігри і показує їх на сторінці. 

Як бачите, наш стейт (фільтровні ігри) більше не є локальним, але чи доцільно зберігати його в глобальному сторі? З однієї сторони це досить зручно для використання та рефакторингу, ще й відокремлює логіку фільтрації від компоненту. Це безумовно плюс. 

З іншої сторони, в моєму прикладі, і пошукове слово, і список ігор потрібні лише тим компонентам що лежать дуже поруч і нікому іншому. Чи варто, в цьому випадку, викладати дані в стор? На мою думку все ще ні, ми цілком можемо обійтися локальним стором, або ж, хоча б створити окремий слайс для цих даних, якщо, УВАГА, ви очікуєте ускладнення цієї логіки.

## Код смелл № 4 Збереження похідних даних в глобальному сторі

Ще одним популярним CodeSmell є збереження похідних даних у стейті або сторі. Якщо подивитись на reducer `searchGame` ми побачимо, що він не просто записує в стор пошукове слово, а, ще й виконує фільтрацію ігор.А, оскільки ми не можемо використовувати поле allGames, тому я змушений був завести додатковое поле `filteredGames` для тих елементів які прошли фільтрацію. Це роздуває наш стор, ускладнює його використання, збільшує обсяг пам'яті який потрібен нашому застосунку для роботи. І, якщо зараз мій стор все ще досить маленький, то уявіть собі що станеться коли в мене таких редьсюреів буде два десятка. 

Для того що б це виправити ми можемо винести функцію фільтрації зі стору, а саму фільтрацію зробити в компоненті. Це дасть нам можливість в подальшому перевикористати цю функцію та протествувати її, якщо там буде складна логіка. 

Єдине застереження не робіть фільтрацію в useSelector. Оскільки .filter повертає новий екземпляр масиву, оптимізація закладена в useSelector не спрацює і компонент буде перерендерюватися постійно з будь-якою зміною стейту.

З код смелами про збереження даних розібралися, тепер давайте перейдемо до код смелів із читанням даних з глобального стору.

## Код смелл №5 використання єдиного глобального стору для всього застосунку 

Наступний код смел - використання єдиного глобального стору для всього застосунку. Як бачите в мене є щонайменше два набори даних які між собою не пов'язані - це ігри і користувач. Тримати їх в одному місці немає жодної потреби, це зайве переускладення стору, тим паче, що в redux toolkit є інструмент, призначений для розрізання стору на не залежні шматки - `createSlice`. Використвуйте createSlice для того щоб розділити ваш стор на логічно не залежні частини. Це зменшить крихкість стору і полегшить його читання та підтримку. 

Для того щоб визначити не залежні частини даних - достатньо поставити запитання чи повинні ці дані змінюватися коли змінюються якийсь іншій набір даних. Наприклад, чи мають змінюватися дані користувача, якщо змінюються відфільторані ігри? Напевно - ні. Отже ці дані не залежні і можуть бути винесені в окремий слайс.

## Код смелл №6 отимання всього слайсу в useSelector, або залежність від усього стору.

Дуже простий код смелл - не коректне використання useSelector, а саме отримання усього стору замість лише потрібних даних. 

Тут недолік лише один, але суттєвий - оскільки ваш компонент залижть від усього стору, то й перерендерюватися він буде на будь-яку зміну стору. Давайте подивимось на демонстрацію цієї проблеми. 

Маємо компонент nav який залежить від усього стору і який рендериться досить довго. Тепер пробуємо зробити пошук і, як бачите, все працює дуже повільно. Причину ви також бачите на екрані - наш нав перемальовуються на кожну зміну пошукового слова. 

Тепер змінюємо useSelector, пробуємо знову і все працює як треба, nav не перерендерюються, а застосунок працює без затримок.

## І, нарешті, останній сьомий код смелл - отримання даних зі стейту замість пропсів

Ще одну, досить очевидну помилку можна побачити в компоненті `Game` яка полягає у надлишковому використанні стору. У нас є компонент Game який одночасно вміє дістати дані зі стору і відмалювати їх. Це порушення принципу єдиної відповідальності, яке призвело до зайвого ускладення коду та збільшення зв'язності коду, оскільки наш Game тепер знає про стор. 

Замість цього ми могли б просто використати Props щоб отримати необхідні для компоненту дані. Таким чином цей компонент стане незалежним та більш універсальним і зможе використовувати дані з будь-якого джерела. За можливості, краще використовувати пропси замість стору, або хоча б розділяти компоненти на ті які вміють отримувати дані і ті які вміють їх використовувати. Як не дивно, HighOrderComponents досі живі, не дивлячись на очевидну перемогу хуків, саме тому що допомагаються відділяти презентаційні компоненти від усього іншого.

Це, звичайно, не обов'язково, але може зробити ваші компоненти простішими. 


А, що робити, якщо моєму компонентові потрібно дуже багато даних і пропси виростають до монструозних розмірів? В такому випадку, скоріше за все, ваш компонет занадто складний і потребує розбиття на складові. Пам'ятайте, що сила реакту в маленких компонентах. 700 рядків на один компонент то шлях страждань, а не самурая. 



## Збереження похідних даних в глобальному сторі

Ще одним популярним CodeSmell є збереження похідних даних у стейті або сторі. Якщо подивитись на reducer `searchGame` ми побачимо, що він не просто записує в стор пошукове слово, а, ще й виконує фільтрацію ігор.А, оскільки ми не можемо використовувати поле allGames, тому я змушений був завести додатковое поле `filteredGames` для тих елементів які прошли фільтрацію. Це роздуває наш стор, ускладнює його використання, збільшує обсяг пам'яті який потрібен нашому застосунку для роботи. І, якщо зараз мій стор все ще досить маленький, то уявіть собі що станеться коли в мене таких редьсюреів буде два десятка. 

Для того що б це виправити ми можемо винести функцію фільтрації зі стору, а саму фільтрацію зробити в компоненті. Це дасть нам можливість в подальшому перевикористати цю функцію та протествувати її, якщо там буде складна логіка. 

Єдине застереження не робіть фільтрацію в useSelector. Оскільки .filter повертає новий екземпляр масиву, оптимізація закладена в useSelector не спрацює і компонент буде перерендерюватися постійно з будь-якою зміною стейту.

## Використання єдиного глобального стору для всього застосунку

Наступний код смел - використання єдиного глобального стору для всього застосунку. Як бачите в мене є щонайменше два набори даних які між собою не пов'язані - це ігри і користувач. Тримати їх в одному місці немає жодної потреби, це зайве переускладення стору, тим паче, що в redux toolkit є інструмент, призначений для розрізання стору на не залежні шматки - `createSlice`. Використвуйте createSlice для того щоб розділити ваш стор на логічно не залежні частини. Це зменшить крихкість стору і полегшить його читання та підтримку. 

Для того щоб визначити не залежні частини даних - достатньо поставити запитання чи повинні ці дані змінюватися коли змінюються якийсь іншій набір даних. Наприклад, чи мають змінюватися дані користувача, якщо змінюються відфільторані ігри? Напевно - ні. Отже ці дані не залежні і можуть бути винесені в окремий слайс.


## Залежність від усього стору

Дуже простий код смелл - не коректне використання useSelector, а саме отримання усього стору замість лише потрібних даних. 

Тут недолік лише один, але суттєвий - оскільки ваш компонент залижть від усього стору, то й перерендерюватися він буде на будь-яку зміну стору. Давайте подивимось на демонстрацію цієї проблеми. 

Маємо компонент nav який залежить від усього стору і який рендериться досить довго. Тепер пробуємо зробити пошук і, як бачите, все працює дуже повільно. Причину ви також бачите на екрані - наш нав перемальовуються на кожну зміну пошукового слова. 

Тепер змінюємо useSelector, пробуємо знову і все працює як треба, nav не перерендерюються, а застосунок працює без затримок.




Якщо ця помилка здається вам занадто очевидною, давайте подивимось на ще одну, схожу ситуацію.

У мене є компонент search, який використовує глобальний стор для збереження слова для пошуку по іграм. Це саме слово використовується і в компоненті вище для, власне, фільтрації ігор, тобто це вже не локальний стор так як він необхідний для декількох компонентів одразу. Більше того, від нього прямо залежить список ігор які ми бачимо на екрані. 

Давайте знову подумаємо, чи варто використовувати глобальний стор вже в цьому випадку?

На мою думку тут є і переваги і недоліки. Перевагою є мобільність - ми можемо переміщати search компонент куди завгодно і все буде працювати без жодних модифікацій. 

Але недоліків набагато більше - прив'язаність до конкретного стору, ускладнення стору, перформанс, порушення інкапсуляції. Покажу вам невеличку демонстрацію, як ці недоліки можуть вилізти боком:

Робимо пошук, переходимо на сторінку відгуків і бачимо те що ми вводили на геть іншій сторінці. Навряд чи це то що нам потрібно. Причина цієї помилки та сама - стан наших компонентів занадто відритий і може бути випадково змінений.

Ну і цікаво те, як такий підхід впливає на швидкодію. Підключаємо React Developer Tools, включаємо прапорець підсвічувати компоненти які рендеряться і пробуємо зробити пошук. 

Як бачите, рендериться абсолютно все, в тому числі і навігація, яка і незмінна, і знаходиться вище за ієрархією. 

Чи вартує зручність переміщення компоненту таких жертв? На мою думку - ні. 

Наступний код smell поширений, але дуже простий - використання всього стору замість його наймешної можливої частини. Тут все просто - це питання швидкодії. Якщо ви отримуєте весь стейт, компонент буде рендиритись завжди коли зміниться будь-яка частина стору, навіть та, яка немає до цього жодного стосунку. Тому потрібно використовувати useSelector та брати найменш можливий шматок стору. Для прикладу давайте модифікуємо наш компонент для навігації, щоб він більше не перерендрювався просто так:

Ще не втомилися? Тоді переходимо до наступного code smell  


## Відомі проблеми

- `const { store } = useSelector((state) => state);` - performance issues. Приклад з user
- Використання `searchTerm` в глобальному сторі
- Використання `expanded` в глобальному сторі            +
- Використання глобального стору замість пропсів         +
- Єдиний великий стор в одному слайсі
- Збереження похідного стану в глобальному сторі         +