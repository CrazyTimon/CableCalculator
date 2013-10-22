//Марка кабеля    Число жил и номинальное сечение, мм2    Расчетный наружный диаметр кабеля, мм   Расчетная масса 1 км кабеля, кг
calcDB = [ 
    {   
        id: 1,
        mark: "NYM",
        mark_id: 1,
        sechenie: "1х10",
        diametr: "8.40",
        massa: "182.00"
    },
    {   
        id: 2,
        mark: "NYM",
        mark_id: 1,
        sechenie: "2х2,5",
        diametr: "10.50",
        massa: "186.00"
    },
    {   
        id: 3,
        mark: "ВВГЭнг(А)-LS",
        mark_id: 2,
        sechenie: "5х25",
        diametr: "28.80",
        massa: "1843.00"
    },
    {   
        id: 4,
        mark: "КВВГЭнг",
        mark_id: 3,
        sechenie: "14х2,5",
        diametr: "17.90",
        massa: "612.00"
    },
    {   
        id: 5,
        mark: "КВВГЭнг",
        mark_id: 3,
        sechenie: "19х2,5",
        diametr: "20.10",
        massa: "800.00"
    },
    {   
        id: 6,
        mark: "АВВГнг-LS - 0,66",
        mark_id: 4,
        sechenie: "2х10",
        diametr: "16.40",
        massa: "404.00"
    },
    {   
        id: 7,
        mark: "АВВГнг-LS - 0,66",
        mark_id: 4,
        sechenie: "3х10",
        diametr: "17.20",
        massa: "445.00"
    },
    {   
        id: 8,
        mark: "АВВГнг-LS - 0,66",
        mark_id: 4,
        sechenie: "4х10",
        diametr: "18.60",
        massa: "518.00"
    }
    ];
barabansDB = [
    { id: 1, baraban_num: '5', diametr_scheki: 500, diametr_sheiki: 200, length_sheiki: 230, obem_barabana: 0.08, ves_barabana: 18},
    { id: 2, baraban_num: '6', diametr_scheki: 600, diametr_sheiki: 200, length_sheiki: 250, obem_barabana: 0.12, ves_barabana: 25},
    { id: 3, baraban_num: '8', diametr_scheki: 800, diametr_sheiki: 450, length_sheiki: 230, obem_barabana: 0.20, ves_barabana: 43},
    { id: 4, baraban_num: '8а', diametr_scheki: 800, diametr_sheiki: 450, length_sheiki: 400, obem_barabana: 0.30, ves_barabana: 51},
    { id: 5, baraban_num: '86', diametr_scheki: 800, diametr_sheiki: 450, length_sheiki: 500, obem_barabana: 0.37, ves_barabana: 54},
    { id: 6, baraban_num: '10', diametr_scheki: 1000, diametr_sheiki: 545, length_sheiki: 500, obem_barabana: 0.60, ves_barabana: 56},
    { id: 7, baraban_num: '10а', diametr_scheki: 1000, diametr_sheiki: 500, length_sheiki: 710, obem_barabana: 0.81, ves_barabana: 75},
    { id: 8, baraban_num: '12', diametr_scheki: 1220, diametr_sheiki: 650, length_sheiki: 500, obem_barabana: 0.89, ves_barabana: 132},
    { id: 9, baraban_num: '12а', diametr_scheki: 1220, diametr_sheiki: 650, length_sheiki: 710, obem_barabana: 1.21, ves_barabana: 151},
    { id: 10, baraban_num: '12б', diametr_scheki: 1220, diametr_sheiki: 600, length_sheiki: 600, obem_barabana: 1.04, ves_barabana: 145},
    { id: 11, baraban_num: '14', diametr_scheki: 1400, diametr_sheiki: 750, length_sheiki: 710, obem_barabana: 1.62, ves_barabana: 217},
    { id: 12, baraban_num: '14а', diametr_scheki: 1400, diametr_sheiki: 900, length_sheiki: 500, obem_barabana: 1.21, ves_barabana: 200},
    { id: 13, baraban_num: '14б', diametr_scheki: 1400, diametr_sheiki: 1000, length_sheiki: 600, obem_barabana: 1.40, ves_barabana: 234},
    { id: 14, baraban_num: '14в', diametr_scheki: 1400, diametr_sheiki: 750, length_sheiki: 710, obem_barabana: 1.67, ves_barabana: 226},
    { id: 15, baraban_num: '14г', diametr_scheki: 1400, diametr_sheiki: 750, length_sheiki: 900, obem_barabana: 1.99, ves_barabana: 266},
    { id: 16, baraban_num: '16', diametr_scheki: 1600, diametr_sheiki: 1200, length_sheiki: 600, obem_barabana: 1.83, ves_barabana: 308},
    { id: 17, baraban_num: '16а', diametr_scheki: 1600, diametr_sheiki: 800, length_sheiki: 800, obem_barabana: 2.34, ves_barabana: 323},
    { id: 18, baraban_num: '17', diametr_scheki: 1700, diametr_sheiki: 900, length_sheiki: 750, obem_barabana: 2.57, ves_barabana: 367},
    { id: 19, baraban_num: '17а', diametr_scheki: 1700, diametr_sheiki: 900, length_sheiki: 900, obem_barabana: 3.01, ves_barabana: 390},
    { id: 20, baraban_num: '18', diametr_scheki: 1800, diametr_sheiki: 1120, length_sheiki: 900, obem_barabana: 3.43, ves_barabana: 535},
    { id: 21, baraban_num: '18а', diametr_scheki: 1800, diametr_sheiki: 900, length_sheiki: 900, obem_barabana: 3.43, ves_barabana: 494},
    { id: 22, baraban_num: '18б', diametr_scheki: 1800, diametr_sheiki: 750, length_sheiki: 1000, obem_barabana: 3.76, ves_barabana: 590},
    { id: 23, baraban_num: '18в', diametr_scheki: 1800, diametr_sheiki: 900, length_sheiki: 730, obem_barabana: 2.88, ves_barabana: 434},
    { id: 24, baraban_num: '20', diametr_scheki: 2000, diametr_sheiki: 1220, length_sheiki: 1000, obem_barabana: 4.72, ves_barabana: 763},
    { id: 25, baraban_num: '20а', diametr_scheki: 2000, diametr_sheiki: 1000, length_sheiki: 1060, obem_barabana: 4.96, ves_barabana: 725},
    { id: 26, baraban_num: '20б', diametr_scheki: 2000, diametr_sheiki: 1500, length_sheiki: 1000, obem_barabana: 4.72, ves_barabana: 941},
    { id: 27, baraban_num: '22', diametr_scheki: 2200, diametr_sheiki: 1320, length_sheiki: 1000, obem_barabana: 5.98, ves_barabana: 965},
    { id: 28, baraban_num: '22а', diametr_scheki: 2200, diametr_sheiki: 1480, length_sheiki: 1050, obem_barabana: 6.22, ves_barabana: 1029},
    { id: 29, baraban_num: '226', diametr_scheki: 2200, diametr_sheiki: 1680, length_sheiki: 1100, obem_barabana: 6.47, ves_barabana: 1110},
    { id: 30, baraban_num: '22в', diametr_scheki: 2200, diametr_sheiki: 1320, length_sheiki: 1100, obem_barabana: 6.47, ves_barabana: 1198},
    { id: 31, baraban_num: '25', diametr_scheki: 2500, diametr_sheiki: 1500, length_sheiki: 1300, obem_barabana: 9.75, ves_barabana: 1540},
    { id: 32, baraban_num: '26', diametr_scheki: 2650, diametr_sheiki: 1500, length_sheiki: 1500, obem_barabana: 12.50, ves_barabana: 1812},
    { id: 33, baraban_num: '30', diametr_scheki: 3000, diametr_sheiki: 1800, length_sheiki: 1800, obem_barabana: 19.44, ves_barabana: 2334},
    { id: 34, baraban_num: '30а', diametr_scheki: 3000, diametr_sheiki: 2500, length_sheiki: 1700, obem_barabana: 17.03, ves_barabana: 1830}
]

/*Номер барабана (название барабана, которое должен выбирать пользователь)     
Диаметр щеки, мм (Dщ)  
Диаметр шейки, мм (dш)  
Длина шейки, мм ( l )   
Объем барабана, м3  
Вес барабана с обшивкой, кг*/