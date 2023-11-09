// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input'); 


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li')
    li.classList.add('fruit__item')

    if (fruits[i].color == 'фиолетовый'){
      li.classList.add('fruit_violet')
    } else
    if (fruits[i].color == 'зеленый') {
			li.classList.add('fruit_green')
		} else
    if (fruits[i].color == 'розово-красный') {
			li.classList.add('fruit_carmazin')
		} else
    if (fruits[i].color == 'желтый') {
			li.classList.add('fruit_yellow')
		} else
    if (fruits[i].color == 'светло-коричневый') {
			li.classList.add('fruit_lightbrown')
		} else
    if (fruits[i].color === 'оранжевый') {
      li.classList.add('fruit_orange')
    }
    else {
      li.classList.add('fruit_newFruit')
    }
    fruitsList.appendChild(li)
    console.log(fruits)

    const div = document.createElement('div')
    div.classList.add('fruit__info')
    li.appendChild(div)

    div.innerHTML = `
      <div>index: ${i + 1}</div>
      <div>kind: ${fruits[i].kind}</div>
      <div>color: ${fruits[i].color}</div>
      <div>weight (кг): ${fruits[i].weight}</div>
    `
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let newFruits = [...fruits]
  while (fruits.length > 0) {
    let randItem = getRandomInt(0, fruits.length - 1)
    result.push(fruits[randItem])
    fruits.splice(randItem, 1)
  }

  fruits = result;
// Если список фруктов не перемешался
  let notShuffled = fruits.every((el, index) => el === newFruits[index])
	if (notShuffled) {
		alert('Не перемешано! Перемешайте ещё раз.')
	}
};
// Кнопка перемешивания массива и отображения нового
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  if (isNaN(maxWeight.value) || isNaN(minWeight.value)) {
    alert('А в цифрах это сколько?')
    maxWeight.value = '';
    minWeight.value = '';
    return fruits;
  }
  return fruits.filter ((item) => {
    if (parseInt(minWeight.value) > parseInt(maxWeight.value)){
      [minWeight.value, maxWeight.value] = [maxWeight.value, minWeight.value];
    }
    return (item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value))
  })
  
};

filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display();

});

/*** СОРТИРОВКА ***/

let sortKind = 'quickSort' // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priorityColor = ['светло-коричневый', 'зеленый','фиолетовый', 'розово-красный', 'желтый'];
  const color1 = priorityColor.indexOf(a.color);
  const color2 = priorityColor.indexOf(b.color); 
  return color1 > color2;
};

const sortAPI = {

// Вызов метода сортировки пузырьком

	bubbleSort(arr, comparation){
    bubbleMethod(arr, comparation)  
  },

// Вызов метода быстрой сортировки

	quickSort(arr, comparation){
    quickSortMethod(arr, comparation)
  },

	// выполняет сортировку и производит замер времени

	startSort(sort, arr, comparation) {
		const start = new Date().getTime()
		sort(arr, comparation)
		const end = new Date().getTime()
		sortTime = `${end - start} ms`
	}
}

// инициализация полей

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKindLabel.textContent === 'bubbleSort'){
    sortKindLabel.textContent = 'quickSort';
    sortKind = 'quickSort';
  } else {
    sortKindLabel.textContent = 'bubbleSort';
		sortKind = 'bubbleSort';
  }
  // sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

// Кнопка активации сортировки

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = '...sorting'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == ''){
    alert('Мне нужны полные данные фрукта, что-то не заполнил...')
    return
  }
  if (isNaN(weightInput.value)){
    alert('Укажите вес числом!')
    return
  } else {
    fruits.push({
			kind: kindInput.value,
			color: colorInput.value,
			weight: weightInput.value,
		})
  }
		display()
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
});
