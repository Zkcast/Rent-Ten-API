let countries = [
    'Suecia',
    'Mauritania',
    'Argentina',
    'Maldivas',
    'Aruba',
    'México',
    'Nueva Zelanda',
    'Wallis y Futuna',
    'Montenegro',
    'Alandia',
    'Pakistán',
    'Zambia',
    'Islas Pitcairn',
    // 'Seychelles',
    // 'Ecuador',
    // 'Uzbekistán',
    // 'Vanuatu',
    // 'Tierras Australes y Antárticas Francesas',
    // 'Isla de Navidad',
    // 'Singapur',
    // 'Surinam',
    // 'Sahara Occidental',
    // 'Malasia',
    // 'Saint Martin',
    // 'Islas Heard y McDonald',
    // 'Irlanda',
    // 'Costa Rica',
    // 'Noruega',
    // 'Antártida',
    // 'Catar',
    // 'Australia',
    // 'Groenlandia',
    // 'Mauricio',
    // 'Kazajistán',
    // 'Territorio Británico del Océano Índico',
    // 'Bahrein',
    // 'Papúa Nueva Guinea',
    // 'Burundi',
    // 'India',
    // 'Albania',
    // 'Santa Lucía',
    // 'Uruguay',
    // 'Barbados',
    // 'Nueva Caledonia',
    // 'Estonia',
    // 'Niue',
    // 'Letonia',
    // 'Puerto Rico',
    // 'Libia',
    // 'San Bartolomé',
    // 'Chipre',
    // 'Grenada',
    // 'Macao',
    // 'Siria',
    // 'Lituania',
    // 'Curazao',
    // 'Dominica',
    // 'Isla de Man',
    // 'Kirguizistán',
    // 'Trinidad y Tobago',
    // 'Togo',
    // 'Palestina',
    // 'Madagascar',
    // 'Croacia',
    // 'Islas Faroe',
    // 'Haití',
    // 'Montserrat',
    // 'Grecia',
    // 'Timor Oriental',
    // 'Martinica',
    // 'Islas Cook',
    // 'Taiwán',
    // 'Suazilandia',
    // 'Ucrania',
    // 'Bermudas',
    // 'Corea del Sur',
    // 'Perú',
    // 'Irak',
    // 'Moldavia',
    // 'San Marino',
    // 'Venezuela',
    // 'Guyana',
    // 'Islas Caimán',
    // 'Cuba',
    // 'Níger',
    // 'Camboya',
    // 'Islas Cocos o Islas Keeling',
    // 'Malta',
    // 'Sri Lanka',
    // 'Sudán',
    // 'Islas Vírgenes de los Estados Unidos',
    // 'Eritrea',
    // 'Somalia',
    // 'Israel',
    // 'Isla de Norfolk',
    // 'Rusia',
    // 'Comoras',
    // 'Uganda',
    // 'Nauru',
    // 'Suiza',
    // 'Portugal',
    // 'Tayikistán',
    // 'Sudán del Sur',
    // 'Isla Bouvet',
    // 'Micronesia',
    // 'Samoa Americana',
    // 'Chequia',
    // 'Nicaragua',
    // 'Botswana',
    // 'Mali',
    // 'Túnez',
    // 'Anguilla',
    // 'Guinea-Bisáu',
    // 'República Eslovaca',
    // 'Islas Marshall',
    // 'Argelia',
    // 'Jamaica',
    // 'Mozambique',
    // 'España',
    // 'Honduras',
    // 'Países Bajos',
    // 'Sudáfrica',
    // 'Azerbaiyán',
    // 'Macedonia del Norte',
    // 'Gambia',
    // 'Liberia',
    // 'Luxemburgo',
    // 'Cabo Verde',
    // 'Tanzania',
    // 'Georgia',
    // 'Kiribati',
    // 'Guatemala',
    // 'China',
    // 'Sierra Leone',
    // 'Alemania',
    // 'Chad',
    // 'Reino Unido',
    // 'Eslovenia',
    // 'Tailandia',
    // 'Indonesia',
    // 'Islas Marianas del Norte',
    // 'Guam',
    // 'Finlandia',
    // 'Mayotte',
    // 'Gibraltar',
    // 'Turkmenistán',
    // 'Kosovo',
    // 'Costa de Marfil',
    // 'Marruecos',
    // 'República Dominicana',
    // 'Ghana',
    // 'Ciudad del Vaticano',
    // 'Jersey',
    // 'Turquía',
    // 'Tuvalu',
    // 'Iran',
    // 'Egipto',
    // 'Dinamarca',
    // 'Kenia',
    // 'Bulgaria',
    // 'Zimbabue',
    // 'Angola',
    // 'Nigeria',
    // 'Polonia',
    // 'Senegal',
    // 'Filipinas',
    // 'Guernsey',
    // 'Santa Elena, Ascensión y Tristán de Acuña',
    // 'El Salvador',
    // 'Kuwait',
    // 'Tonga',
    // 'Líbano',
    // 'Afganistán',
    // 'San Cristóbal y Nieves',
    // 'República Centroafricana',
    // 'Samoa',
    // 'Serbia',
    // 'Armenia',
    // 'Bangladesh',
    // 'Laos',
    // 'Chile',
    // 'Polinesia Francesa',
    // 'Panamá',
    // 'Estados Unidos',
    // 'Nepal',
    // 'Omán',
    // 'Myanmar',
    // 'Islas Malvinas',
    // 'Hungría',
    // 'Palau',
    // 'Guinea Ecuatorial',
    // 'Guinea',
    // 'Emiratos Árabes Unidos',
    // 'Islas Turks y Caicos',
    // 'Islas Vírgenes del Reino Unido',
    // 'Liechtenstein',
    // 'Bosnia y Herzegovina',
    // 'Malawi',
    // 'Bután',
    // 'Camerún',
    // 'Andorra',
    // 'Guadalupe',
    // 'Congo',
    // 'Reunión',
    // 'Burkina Faso',
    // 'Jordania',
    // 'Congo (Rep. Dem.)',
    // 'Islas Tokelau',
    // 'Vietnam',
    // 'Sint Maarten',
    // 'Bélgica',
    // 'Islas Ultramarinas Menores de Estados Unidos',
    // 'Brasil',
    // 'Belice',
    // 'Santo Tomé y Príncipe',
    // 'Paraguay',
    // 'Benín',
    // 'Brunei',
    // 'Bolivia',
    // 'Djibouti',
    // 'Guayana Francesa',
    // 'Canadá',
    // 'San Pedro y Miquelón',
    // 'Japón',
    // 'Ruanda',
    // 'San Vicente y Granadinas',
    // 'Islandia',
    // 'Bielorrusia',
    // 'Hong Kong',
    // 'Lesotho',
    // 'Fiyi',
    // 'Austria',
    // 'Colombia',
    // 'Gabón',
    // 'Arabia Saudí',
    // 'Islas Georgias del Sur y Sandwich del Sur',
    // 'Etiopía',
    // 'Caribe Neerlandés',
    // 'Mónaco',
    // 'Antigua y Barbuda',
    // 'Corea del Norte',
    // 'Italia',
    // 'Namibia',
    // 'Mongolia',
    // 'Islas Salomón',
    // 'Yemen',
    // 'Rumania',
    // 'Islas Svalbard y Jan Mayen',
    // 'Francia',
    // 'Bahamas',
]


let photos = [
    "https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149", 
    "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b", 
    "https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg",
    "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    "https://thumbs.dreamstime.com/b/luxury-big-modern-house-electric-car-luxury-modern-house-electric-car-141295838.jpg",
    "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/2/7/3/BP_HHMTN310_Bolden_home-exterior_AFTER_0132.jpg.rend.hgtvcom.966.644.suffix/1549585070420.jpeg",
    "https://i.pinimg.com/originals/a1/c7/10/a1c710b599e8b83e74fef1371653987b.png",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8&w=1000&q=80",
    "https://thumbs.dreamstime.com/b/beautiful-exterior-home-pictures-new-home-design-images-modern-best-house-design-images-best-house-images-images-latest-172194515.jpg",
    "https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg",
    "https://ap.rdcpix.com/41d2b0cbffbeaeed286dc5c4690e49fbl-m2059605563od-w480_h360_x2.jpg",
    "https://api.makemyhouse.com/public/Media/rimage/500?objkey=1593717795_4606.jpg&watermark=false",
    "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
    "https://assets-news.housing.com/news/wp-content/uploads/2022/04/07013406/ELEVATED-HOUSE-DESIGN-FEATURE-compressed.jpg",
    "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    "https://fotos.alquilerargentina.com/v7/propiedades/rt94/rt94-Cabana-RABSFTWG.jpg?p=general",
    "https://http2.mlstatic.com/D_NQ_NP_889471-MLA33060547116_122019-O.jpg",
    "https://www.puertoarauco.com/nueva/wp-content/uploads/2021/06/Cab-Tronco-Estar.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cabana-de-madera-anna8-1627632134.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
    "https://media.staticontent.com/media/pictures/b5b843a2-5325-49b2-a7df-01327e002282",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/229756234.jpg?k=8df418ca158e4e77215acbe051294a0022753cf24fe88d5c642232c95ec4c3fa&o=&hp=1",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/caban-a-disen-o-actual-1535369712.jpg?crop=0.728xw:0.814xh;0.116xw,0.186xh&resize=640:*",
    "https://www.hogares.cl/wp-content/uploads/2018/06/SLA_3734.jpg",
    "https://i.ytimg.com/vi/1R5nfV8qOds/maxresdefault.jpg",
    "https://www.bankrate.com/2019/07/09120854/How-much-does-it-cost-to-sell-a-house.jpeg",
    "https://thumbs.dreamstime.com/b/suburban-house-sale-3433651.jpg",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
    "https://media.istockphoto.com/id/1208205959/photo/beautiful-living-room-interior-with-hardwood-floors-and-and-view-of-kitchen-in-new-luxury-home.jpg?s=612x612&w=0&k=20&c=16JDpVWFywqqrVwR9g4CGSkIZoyJsg76w4SGNTBr-1I=",
    "https://thearchitecturedesigns.com/wp-content/uploads/2019/03/7-wooden-house-design-ideas-1024x576.jpg",
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/07950793-0517-4fc6-ac81-80f14b943aaa-standing%20seam%20metal%20clading%20from%20nedzink.jpg",
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/d0b17b65-bd89-4c5c-8a9f-f300894b06c1-Untitled%20design%20(27).jpg",
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/0af2108f-4d75-4bf8-b793-0c4b9d0353bd-Untitled%20design%20(30).jpg",
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/859af247-991a-46c8-a8cc-7b9331304137-Untitled%20design%20(26).jpg",
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/97a7ced6-b891-4c85-a9a0-a5079c507255-Contemporary%20Home%20Development%20(1).jpg",
    















]

let booleans = [true, false]
let houseTypes = ['department', 'guest house', 'house', 'hotel']
let adresses = ['San Martin', "Bolivia", "Roca", "Calle Falsa", "Rincon del mundo", "The best zone", "Belgrano", "Fake Street", "La paz", "St. Street", "Avenida siempre viva", "Evergreen Terrace", "9 de julio", "13 de septiembre", "Azure", "Henry Street", "Javascript", "Calle del sol"]
let cities = ["Helsinki", "Vancouver", "Toronto", "Boston", "Brisbane", "Múnich", "Edimburgo", "Sídney", "Perth", "Buenos Aires", "La Paz", "Caracas", "Tulum", "Alicate", "Valencia", "Santiago", "Bogotá", "Lisboa", "Kyev", "Moscu", "Taiwan"]

let opinions = ["Muy buena", "Excelente", "Todo perfecto", "No me gusto!"]

module.exports = {
    countries,
    photos,
    booleans,
    houseTypes,
    adresses,
    cities,
    opinions
}