const express = require('express');
const cors = require('cors');
const api = express();

api.use(cors());

const data = [
    {
        unit: "Unit 1: Think Geographically",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Absolute Location",
                        answer: "the exact location of a place, typically given in latitude and longitude",
                    },
                    {
                        question: "Relative Location",
                        answer: "the location of a place in relation to other places"
                    },
                    {
                        question: "Site",
                        answer: "a place's absolute location and physical characteristics"
                    },
                    {
                        question: "Situation",
                        answer: "a place's location in relation to other places or surrounding features"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "The lush golf courses in the United Arab Emirates, the dikes and polders in the Netherlands, and the Three Gorges Dam in China are significant examples of land use. These examples reflect which viewpoint of human-environment interaction?",
                        answer: "Environmental possibilism"
                    },
                    {
                        question: "What is the main reason peripheral countries do not become part of the core?",
                        answer: "Peripheral countries lack the infrastructure in education and technology"
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "Which of the following explains a limitation of the three-tiered structure of Wallerstein’s world systems theory?"
                            + "\nA. The model does not provide for countries outside of the core to accomplish any of the United Nations Sustainable Development Goals."
                            + "\nB. The scale of the model does not pertain to individual countries but rather to regions in the global contexts of core, semiperiphery, and periphery."
                            + "\nC. Individual countries can score higher on certain indicators of development and lower on other indicators as they shift from the periphery to the core."
                            + "\nD. The model locks most countries into the development model of core, semiperiphery, and periphery with little opportunity for peripheral economies to advance into the wealthy core."
                            + "\nE. The three-tiered system of the model cannot be mapped; therefore, the model has no spatial application.",
                        answer: "D"
                    },
                    {
                        question: "Which of the following sets of maps would help explain how scale of inquiry affects truth?"
                            + "\nA. Maps showing the area of France before and after surveying"
                            + "\nB. Maps of Hudson Bay drawn by Native Americans and by the earliest European travelers"
                            + "\nC. Maps showing Michigan's population density by counties and the United States population density by state"
                            + "\nD. Maps showing the number of auto thefts per block in Seattle in the decades before and after the Depression"
                            + "\nE. Maps of gang graffiti in Philadelphia",
                        answer: "C"
                    }
                ]
            }
        ]
    },
    {
        unit: "Unit 2: Population and Migration Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Physiological Density",
                        answer: "the number of people per unit of arable land"
                    },
                    {
                        question: "Carrying Capacity",
                        answer: "the maximum population size that an environment can sustain"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "The stage of the demographic transition model with low or negative CBR and CDR with ZPG, and possible negative growth is",
                        answer: "Stage 5"
                    },
                    {
                        question: "What is the third stage of the epidemiological transition model?",
                        answer: "Degenerative and human-made diseases"
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "A refugee enters the European Union in Italy and is temporarily housed in Germany. He is then granted asylum and is permanently settled in Sweden. Which of the following describes this type of migration that is facilitated by the European Union’s open border policies?"
                            + "\nA. Chain migration within the refugee’s family and social network."
                            + "\nB. Guest worker migration based upon the free movement of labor."
                            + "\nC. As an internally displaced person within a single state."
                            + "\nD. As a rural-to-urban migrant seeking employment opportunities."
                            + "\nE. Step migration across member states to a final destination.",
                        answer: "E"
                    },
                    {
                        question: "Since the 1970s changes in the social roles, lifestyles, and employment patterns of women in Europe, Canada, and the United States have affected the overall population through which of the following?"
                            + "\nA. Increased total fertility rates"
                            + "\nB. Decreased total fertility rates"
                            + "\nC. Increased death rates"
                            + "\nD. Decreased death rates"
                            + "\nE. Increased infant mortality rates",
                        answer: "B"
                    }
                ],
            }
        ]
    },
    {
        unit: "Unit 3: Cultural Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Ethnocentrism",
                        answer: "the tendency of ethnic groups to evaluate other groups based on the belief that their own culture is superior to others"
                    },
                    {
                        question: "Pidgin Language",
                        answer: "a language with simplified grammar and limited vocabulary for communication among speakers of different languages"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "The following is an example of which type of diffusion? When McDonald’s diffused to India, they introduce the Maharaja Mac featuring a chicken burger instead of a beef one.",
                        answer: "Stimulus diffusion"
                    },
                    {
                        question: "The dominant branch of Islam is",
                        answer: "Sunni"
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "Which of the of the following languages would be considered a lingua franca of East Africa?"
                            + "\nA. Hindi"
                            + "\nB. English"
                            + "\nC. French"
                            + "\nD. Swahili"
                            + "\nE. Zulu",
                        answer: "D"
                    },
                    {
                        question: "Which of the following best explains why the process of acculturation typically takes three generations?"
                            + "\nA. Religion and language are often lost parts of culture by the third generation."
                            + "\nB. Food, music, and other parts of heritage are mostly lost within three generations."
                            + "\nC. Use of the home language usually fades away within three generations."
                            + "\nD. Most third-generation immigrants have become billingual."
                            + "\nE. Language has spread via relocation diffusion by the third generation.",
                        answer: "C"
                    }
                ],
            }
        ]
    },
    {
        unit: "Unit 4: Political Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Gerrymandering",
                        answer: "the process of redrawing legislative boundaries to give one political party an advantage in elections"
                    },
                    {
                        question: "Territoriality",
                        answer: "control and influence over a specific geographic space"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "In political geography, the question state is synonymous with",
                        answer: "country"
                    },
                    {
                        question: "The Kurdish people are an example of a",
                        answer: "stateless nation"
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "Europe contains several examples of nation-states because"
                            + "\nA. very little migration has occurred there."
                            + "\nB. everyone in Europe is European."
                            + "\nC. the dominant religions are Protestant and Catholic."
                            + "\nD. boundaries were redrawn on the basis of language after World War II."
                            + "\nE. existing nation-states were formed directly from noble estates in feudal times.",
                        answer: "D"
                    },
                    {
                        question: "A state’s control over the ocean varies with distance from the shore as dequestionined by the"
                            + "\nA. size of that country’s navy."
                            + "\nB. distance to the nearest other state."
                            + "\nC. depth of the ocean."
                            + "\nD. United Nations Convention on the Law of the Sea."
                            + "\nE. predominant winds and currents.",
                        answer: "D"
                    }
                ],
            }
        ]
    },
    {
        unit: "Unit 5: Agriculture and Rural Land-Use Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Economies of Scale",
                        answer: "cost reductions that occur when production rises"
                    },
                    {
                        question: "Extensive Farming",
                        answer: "an agricultural practice with few inputs and little investment in labor and capital that results in relatively low outputs"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "What is the main idea of the Von Thunen model?",
                        answer: "The cost of transportation and the perishability of goods influence the location of agricultural land use in relation to the central business district."
                    },
                    {
                        question: "What are the environmental consequences of the Green Revolution?",
                        answer: "The Green Revolution caused soil degradation, water pollution from fertilizers and pesticides, and loss of biodiversity."
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "Which of the following best describes the difference between the Long Lot survey system and the Metes and Bounds survey system?"
                            + "\nA. The Long Lot system uses a rigid grid-like pattern of square townships, while the Metes and Bounds system uses narrow strips of land extending from rivers."
                            + "\nB. The Long Lot system was primarily used by British settlers on the East Coast, while the Metes and Bounds system was used by French settlers in Louisiana."
                            + "\nC. The Long Lot system results in a linear settlement pattern along transportation routes like rivers, while the Metes and Bounds system uses natural features to create irregular property boundaries."
                            + "\nD. The Long Lot system relies on geometric calculations to create large square sections, while the Metes and Bounds system is based on the Land Ordinance of 1785."
                            + "\nE: The Long Lot system was designed for large-scale corporate ranching, while the Metes and Bounds system was designed for modern urban planning.",
                        answer: "C"
                    },
                    {
                        question: "Which of the following agricultural practices is most associated with the use of slash-and-burn techniques and is primarily found in tropical rainforest climate zones?"
                            + "\nA. Mediterranean agriculture"
                            + "\nB. Mixed crop and livestock farming"
                            + "\nC. Shifting cultivation"
                            + "\nD. Pastoral nomadism"
                            + "\nE. Intensive subsistence agriculture",
                        answer: "C"
                    }
                ],
            }
        ]
    },
    {
        unit: "Unit 6: Cities and Urban Land-Use Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Blockbusting",
                        answer: "form of housing discrimination where real estate agents would stir up concern that Black families would soon move into a neighborhood to convince White homeowners to sell their houses at low prices"
                    },
                    {
                        question: "Gentrification",
                        answer: "urban process where higher income residents renovate deteriorating neighborhoods, leading to increased property values and the displacement of lower income residents"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "What is the main idea of the rank-size rule?",
                        answer: "The rank-size rule states that the second largest city in a country will have half the population of the largest city, the third largest city will have one-third the population of the largest city, and so on."
                    },
                    {
                        question: "What are the causes of food desserts?",
                        answer: "Food deserts are caused by a lack of access to grocery stores, often due to socioeconomic factors such as poverty, lack of transportation, and higher prices."
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "Which of the following urban models is best characterized by a central business district (CBD) surrounded by a beltway and edge cities that reflect urban sprawl?"
                            + "\nA. Burgess Concentric Zone Model"
                            + "\nB. Hoyt Sector Model"
                            + "\nC. Harris-Ullman Multiple Nuclei Model"
                            + "\nD. Galactic City Model"
                            + "\nE. Latin American City Model",
                        answer: "D"
                    },
                    {
                        question: "Which of the following best describes the historical practice of redlining and its long-question impact on urban neighborhoods?"
                            + "\nA. It was a government-led effort to provide low-interest loans to all residents, leading to the rapid growth of the suburban sunbelt."
                            + "\nB. It was a discriminatory practice where banks refused to grant home loans in specific neighborhoods based on their racial or ethnic composition, contributing to cycles of disinvestment."
                            + "\nC. It is a modern urban planning strategy used to designate green belts around cities to prevent urban sprawl and environmental degradation."
                            + "\nD. It involves the legal process of eminent domain, where the government seizes private property for public use to build major highways."
                            + "\nE. It refers to the process where middle-class residents move back into inner-city neighborhoods, increasing property values and displacing lower-income residents.",
                        answer: "B"
                    }
                ],
            }
        ]
    },
    {
        unit: "Unit 7: Industrial and Economic Development Patterns and Processes",
        questions: [
            {
                difficulty: "easy",
                cards: [
                    {
                        question: "Agglomeration",
                        answer: "the tendency of enterprises in the same industry to cluster in the same area to benefit from shared services, infrastructure, and labor pools"
                    },
                    {
                        question: "Gross National Income Per Capita",
                        answer: "the total value of goods and services produced globally by a country in a given year divided by the population"
                    }
                ],
            },
            {
                difficulty: "medium",
                cards: [
                    {
                        question: "What is the main idea of Weber’s least cost theory?",
                        answer: "Weber’s least cost theory explains the location of industries relative to the market and raw materials based on transportation costs, labor costs, and agglomeration."
                    },
                    {
                        question: "What are some examples of tertiary sector economic activities?",
                        answer: "a teacher, doctor, or retail worker"
                    }
                ],
            },
            {
                difficulty: "hard",
                cards: [
                    {
                        question: "According to Rostow's Stages of Economic Growth, which stage is characterized by the dominance of the tertiary (service) sector of the economy and the widespread availability of high-value consumer goods like automobiles and appliances?"
                            + "\nA. Traditional Society"
                            + "\nB. Preconditions for Take-off"
                            + "\nC. Take-off"
                            + "\nD. Drive to Maturity"
                            + "\nE. High Mass Consumption",
                        answer: "E"
                    },
                    {
                        question: "According to Wallerstein’s World Systems Theory, which of the following best describes the relationship between core countries and periphery countries?"
                            + "\nA. Periphery countries dominate the global market by providing high-tech services to Core countries."
                            + "\nB. Core countries provide raw materials and cheap labor, while Periphery countries provide capital and manufactured goods."
                            + "\nC. Core countries exploit the Periphery for cheap labor and raw materials, while the Periphery remains dependent on the Core for manufactured goods and investment."
                            + "\nD. Both Core and Periphery countries are equally developed, but they specialize in different stages of the demographic transition."
                            + "\nE. Core countries are primarily focused on subsistence agriculture, while Periphery countries focus on the quaternary sector.",
                        answer: "C"
                    }
                ],
            }
        ]
    }
];

api.get('/', (req, res) => {
    res.json(data);
});

module.exports = api;