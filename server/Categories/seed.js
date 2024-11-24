const Categories = require('./Categories');
const Category = require('./Categories')


const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Мобильная разработка',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект',
    'Машинное обучение',
];

async function writeDataCategory() {
    const length = await Categories.countDocuments();
    if(length == 0) {
        data.map((item, index) => {
            new Category ({
                categoryTitle: item,
                key: index,
            }).save()
        })
    }
    console.log(length);
}

module.exports = writeDataCategory;