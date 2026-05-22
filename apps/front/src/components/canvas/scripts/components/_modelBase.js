const modelsDefault = [{
    key: 1,
    name: "TipoDocumento",
    location: "147.76142374915398 119.04438552856446",
    properties: [
        {
        name: "id",
        type: "integer",
        ico: "pk"
        },
        {
            name: "tipo",
            type: "string",
            ico: "",
            default: "",
        },
        {
            name: "sigla",
            type: "string",
            ico: "",
            default: "",
        },
        {
            name: "descricao",
            type: "",
            ico: "",
            default: "",
        },
    ],
    methods: [
        { name: "hasMany", parameters: [{ name: "TipoDocumento", type: "Documentos" }], ico: "public" },
        { name: "belongToMany", parameters: [{ name: "TipoDocumento", type: "CorpoAcademico" }], ico: "public" }
    ]
},
    {
        key: 11,
        name: "Person",
        location: "582.0456949966159 30.710958862304693",
        properties: [
            { name: "name", type: "String", ico: "public" },
            { name: "birth", type: "Date", ico: "protected" }
        ],
        methods: [
            { name: "getCurrentAge", type: "int", ico: "public" }
        ]
    },
    {
        key: 12,
        name: "Student",
        location: "346.2842712474619 352.2910346984863",
        properties: [
            { name: "classes", type: "List<Course>", ico: "public" }
        ],
        methods: [
            { name: "attend", parameters: [{ name: "class", type: "Course" }], ico: "" },
            { name: "sleep", ico: "" }
        ]
    },
    {
        key: 13,
        name: "Professor",
        location: "807.8071187457699 353.07445373535154",
        properties: [
            { name: "classes", type: "List<Course>", ico: "public" }
        ],
        methods: [
            { name: "teach", parameters: [{ name: "class", type: "Course" }], ico: "" }
        ]
    },
    {
        key: 14,
        name: "Course",
        location: "1189.0685424949238 130.78649215698243",
        properties: [
            { name: "name", type: "String", ico: "public" },
            { name: "description", type: "String", ico: "public" },
            { name: "professor", type: "Professor", ico: "public" },
            { name: "location", type: "String", ico: "public" },
            { name: "times", type: "List<Time>", ico: "public" },
            { name: "prerequisites", type: "List<Course>", ico: "public" },
            { name: "students", type: "List<Student>", ico: "public" }
        ]
    }
];

const modelsDefault2 = [
    {
        key: 1,
        name: "TipoDocumento",
        location: "147.76142374915398 119.04438552856446",
        properties: [
            {
                name: "id",
                type: "integer",
                ico: "pk"
            },
            {
                name: "tipo",
                type: "string",
                ico: "",
                default: "",
            },
            {
                name: "sigla",
                type: "string",
                ico: "",
                default: "",
            },
            {
                name: "descricao",
                type: "",
                ico: "",
                default: "",
            },
        ],
        methods: [
            { name: "hasMany", parameters: [{ name: "TipoDocumento", type: "Documentos" }], ico: "public" },
            { name: "belongToMany", parameters: [{ name: "TipoDocumento", type: "CorpoAcademico" }], ico: "public" }
        ]
    }
]


export default modelsDefault2