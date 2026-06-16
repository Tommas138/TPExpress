const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const exercises = [
  {
    id: 1,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=TAH8RxOS0VI",
    image: "https://fitcron.com/wp-content/uploads/2021/03/00251301-Barbell-Bench-Press_Chest-FIX_720.gif",
    targetIntensity: "75-85% 1RM",
    es: {
      name: "Press de Banca Plano",
      muscleGroup: "Pecho",
      equipment: "Barra olímpica, discos y banco plano",
      breathing: "Inhalar al bajar la barra hacia el pecho, exhalar con fuerza durante el empuje (fase concentrica)",
      technique: "Mantener retraccion escapular, pies apoyados firmemente y evitar el rebote en el esternón."
    }, 
    en: {
      name: "Barbell Bench Press",
      muscleGroup: "Chest",
      equipment: "Barbell, weight plates and flat bench",
      breathing: "Inhale as you lower the bar to your chest, exhale forcefully during the push (concentric phase)",
      technique: "Maintain scapular retraction, feet firmly planted and avoid bouncing the bar off the sternum."
    }
  },
  {
    id: 2,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=eGjt4lk6g34",
    image: "https://fitcron.com/wp-content/uploads/2021/03/03081301-Dumbbell-Fly_Chest-FIX_720.gif",
    targetIntensity: "60-70% 1RM (Enfoque en volumen)", 
    es: {
      name: "Aperturas con Mancuernas",
      muscleGroup: "Pecho",
      equipment: "Mancuernas y banco plano",
      breathing: "Inhalar al abrir los brazos (estiramiento), exhalar al juntar las mancuernas arriba",
      technique: "Mantener una ligera flexión en los codos para proteger la articulación; el movimiento es circular, no de empuje.",
    }, 
    en: {
      name: "Dumbbell Fly",
      muscleGroup: "Chest",
      equipment: "Dumbbells and flat bench",
      breathing: "Inhale as you open your arms (stretch), exhale as you bring the dumbbells together at the top",
      technique: "Keep a slight bend in the elbows to protect the joint; the movement is circular, not a press."
    }
  },
  {
    id: 3,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=WN-kgjtQy8s",
    image: "https://fitcron.com/wp-content/uploads/2021/03/14791301-Lever-Incline-Chest-Press_Chest_720.gif",
    targetIntensity: "RPE 8-9",
    es: {
      name: "Press Inclinado con Máquina",
      muscleGroup: "Pecho",
      equipment: "Máquina de press inclinado (Hammer o similar)",
      breathing: "Inhalar en el descenso controlado, exhalar al extender los brazos",
      technique: "Ajustar el asiento para que los agarres queden a la altura de la parte superior del pectoral."
    },
    en: {
      name: "Incline Machine Press",
      muscleGroup: "Chest",
      equipment: "Incline machine (Hammer or similar)",
      breathing: "Inhale during the controlled descent, exhale while extending the arms",
      technique: "Adjust the seat so that the grips are at the height of the upper portion of the pectoral."
    }
  },
  {
    id: 4,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=WNtBIde3Qks",
    image: "https://fitcron.com/wp-content/uploads/2021/03/01881301-Cable-Middle-Fly_Chest_720.gif",
    targetIntensity: "(12-15 reps)",
    es: {
      name: "Cruce de Poleas",
      muscleGroup: "Pecho",
      equipment: "Máquina de poleas cruzadas",
      breathing: "Exhalar al cruzar los cables frente al cuerpo, inhalar al regresar a la posición inicial",
      technique: "Mantener el torso ligeramente inclinado y apretar el pectoral un second en el punto de máxima contracción."
    },
    en: {
      name: "Cable Cross",
      muscleGroup: "Chest",
      equipment: "Cable crossover machine",
      breathing: "Exhale while crossing the cables in front of the body, inhale while returning to the starting position",
      technique: "Keep the torso slightly inclined and squeeze the chest for a second at the peak of contraction."
    }
  },
  {
    id: 5,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=fJ5QdPGMkiY",
    image: "https://fitcron.com/wp-content/uploads/2021/03/02511301-Chest-Dip_Chest_720.gif",
    targetIntensity: "10-12 reps",
    es: {
      name: "Fondos en Paralelas",
      muscleGroup: "Pecho",
      equipment: "Barras paralelas o estación de fondos",
      breathing: "Inhalar al bajar, exhalar al subir",
      technique: "Inclinar el torso hacia adelante para priorizar el pecho; si el torso está vertical, trabajará más el tríceps."
    },
    en: {
      name: "Dips",
      muscleGroup: "Chest",
      equipment: "Parallel bars or dip station",
      breathing: "Inhale as you lower, exhale as you rise",
      technique: "Lean your torso forward to prioritize the chest; if the torso is vertical, the triceps will work more."
    }
  },
  {
    id: 6,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=no-dXip-rJM",
    image: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Curl_f38580d5-412e-4082-b453-5d319afa94fd_600x600.png?v=1612137128",
    targetIntensity: "70-80% 1RM",
    es: {
      name: "Curl de Bíceps con Barra",
      muscleGroup: "Biceps",
      equipment: "Barra EZ o barra recta",
      breathing: "Exhalar al subir la barra, inhalar al bajar de forma controlada",
      technique: "Evitar el balanceo del tronco. Mantener los codos pegados a los costados en todo momento.",
    }, en: {
      name: "Barbell Biceps Curl",
      muscleGroup: "Biceps",
      equipment: "EZ bar or straight bar",
      breathing: "Exhale as you curl the bar up, inhale as you lower it in a controlled manner",
      technique: "Avoid swinging the torso. Keep the elbows close to the sides at all times."
    }
  },
  {
    id: 7,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=j99intoPKGE",
    image: "https://fitcron.com/wp-content/uploads/2021/04/02981301-Dumbbell-Cross-Body-Hammer-Curl_Forearms_720.gif",
    targetIntensity: "10-12 reps",
    es: {
      name: "Curl Martillo con Mancuernas",
      muscleGroup: "Biceps",
      equipment: "Mancuernas",
      breathing: "Exhalar en la fase de esfuerzo, inhalar al descender",
      technique: "Mantener el agarre neutro (palmas enfrentadas). No rotar las muñecas durante el trayecto.",
    },
    en: {
      name: "Hammer Curl with Dumbbells",
      muscleGroup: "Biceps",
      equipment: "Dumbbells",
      breathing: "Exhale during the effort phase, inhale while descending",
      technique: "Maintain a neutral grip (palms facing each other). Do not rotate the wrists during the movement.",
    }
  },
  {
    id: 8,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=AsipeZH23EY",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00811301-Barbell-Reverse-Preacher-Curl_Forearm_720.gif",
    targetIntensity: "RPE 7-8",
    es: {
      name: "Curl en Banco Scott",
      muscleGroup: "Biceps",
      equipment: "Banco Scott (predicador) y barra EZ",
      breathing: "Inhalar al bajar la barra, exhalar al subir",
      technique: "Evitar la extensión total brusca del codo al bajar para prevenir lesiones en el tendón del bíceps.",
      targetIntensity: "RPE 7-8"
    },
    en: {
      name: "Scott Curl",
      muscleGroup: "Biceps",
      equipment: "Scott bench (preacher) and EZ bar",
      breathing: "Inhale as you lower the bar, exhale as you lift it",
      technique: "Avoid the abrupt full extension of the elbow when lowering to prevent injuries to the bicep tendon.",
      targetIntensity: "RPE 7-8"
    }
  },
  {
    id: 9,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=Is3JRhq37o4",
    image: "https://fitcron.com/wp-content/uploads/2021/04/02971301-Dumbbell-Concentration-Curl_Upper-Arms_720.gif",
    targetIntensity: "12-15 reps",
    es: {
      name: "Curl Concentrado",
      muscleGroup: "Biceps",
      equipment: "Mancuerna y banco",
      breathing: "Exhalar al contraer el bíceps, inhalar al estirar",
      technique: "Apoyar el tríceps contra la cara interna del muslo, no encima de la pierna, para un aislamiento real."
    },
    en: {
      name: "Concentration Curl",
      muscleGroup: "Biceps",
      equipment: "Dumbbell and bench",
      breathing: "Exhale while contracting the biceps, inhale while stretching",
      technique: "Rest the triceps against the inner thigh, not on top of the leg, for true isolation."
    }
  },
  {
    id: 10,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=SykZPuLKj14",
    image: "https://eresfitness.com/wp-content/uploads/Curl-de-biceps-con-polea-alta.webp",
    targetIntensity: "RPE 8",
    es: {
      name: "Curl en Polea Alta",
      muscleGroup: "Biceps",
      equipment: "Máquina de poleas cruzadas",
      breathing: "Exhalar al llevar las manos hacia las orejas",
      technique: "Mantener los brazos paralelos al suelo y los hombros estables. Imagina que haces una pose de competición.",
    },
    en: {
      name: "High Cable Curl",
      muscleGroup: "Biceps",
      equipment: "Cable machine",
      breathing: "Exhale as you bring the handles to your ears",
      technique: "Keep the arms parallel to the floor and the shoulders stable. Imagine you are striking a pose.",
    }
  },
  {
    id: 11,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=PTO862T8U7Y",
    image: "https://fitcron.com/wp-content/uploads/2021/03/04481301-EZ-Barbell-Decline-Close-grip-Face-Press_Triceps_720.gif",
    targetIntensity: "70% 1RM",
    es: {
      name: "Press Francés",
      muscleGroup: "Triceps",
      equipment: "Barra EZ y banco plano",
      breathing: "Inhalar al bajar la barra hacia la frente, exhalar al extender",
      technique: "Los codos deben apuntar siempre al techo y no abrirse hacia afuera durante la ejecución."
    },
    en: {
      name: "French Press",
      muscleGroup: "Triceps",
      equipment: "EZ bar and flat bench",
      breathing: "Inhale as you lower the bar towards your forehead, exhale as you extend",
      technique: "Elbows should always point to the ceiling and not flare out during execution.",
    }
  },
  {
    id: 12,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=Zj1h0ObPsp8",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12271301-Cable-Standing-One-Arm-Tricep-Pushdown-Overhand-Grip_Upper-Arms_720.gif",
    targetIntensity: "12-20 reps",
    es: {
      name: "Extensión de Tríceps en Polea Alta",
      muscleGroup: "Triceps",
      equipment: "polea alta con cuerda o barra recta",
      breathing: "Exhalar al empujar hacia abajo, inhalar al subir",
      technique: "Si usas cuerda, separa los extremos al final del movimiento para maximizar la contracción del tríceps.",
    },
    en: {
      name: "High Cable Triceps Extension",
      muscleGroup: "Triceps",
      equipment: "High cable machine with rope or straight bar",
      breathing: "Exhale as you push down, inhale as you pull up",
      technique: "If using a rope, separate the ends at the end of the movement to maximize triceps contraction.",
    }
  },
  {
    id: 13,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=o9_9RveIa74",
    image: "https://eresfitness.com/wp-content/uploads/2019/11/Press-de-banca-con-agarre-cerrado.jpg",
    targetIntensity: "80-85% 1RM",
    es: {
      name: "press cerrado",
      muscleGroup: "Triceps",
      equipment: "Barra olímpica y banco plano",
      breathing: "Inhalar al bajar, exhalar al extender con potencia",
      technique: "El agarre debe ser al ancho de los hombros; no pongas las manos demasiado juntas o te dolerán las muñecas.",
    },
    en: {
      name: "Close Grip Bench Press",
      muscleGroup: "Triceps",
      equipment: "Olympic bar and flat bench",
      breathing: "Inhale as you lower, exhale as you extend with power",
      technique: "The grip should be shoulder-width; don't place hands too close together or your wrists will hurt.",
    }
  },
  {
    id: 14,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=tZyWUViSqT4",
    image: "https://fitcron.com/wp-content/uploads/2021/04/03331301-Dumbbell-Kickback_Upper-Arms_720.gif",
    targetIntensity: "15+ reps",
    es: {
      name: "Patada de Tríceps",
      muscleGroup: "Triceps",
      equipment: "Mancuerna",
      breathing: "Exhalar al extender el brazo hacia atrás",
      technique: "Mantener el brazo paralelo al suelo; solo se mueve el antebrazo. Bloquear el codo un segundo atrás.",
    },
    en: {
      name: "Triceps Kickback",
      muscleGroup: "Triceps",
      equipment: "Dumbbell",
      breathing: "Exhale as you extend the arm backward",
      technique: "Keep the arm parallel to the floor; only the forearm moves. Lock the elbow a second back.",
    }
  },
  {
    id: 15,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=Zd0gP_QvWGA",
    image: "https://fitcron.com/wp-content/uploads/2021/03/08121301-Triceps-Dip-bench-leg_Upper-Arms_720.gif",
    targetIntensity: "17 reps",
    es: {
      name: "Fondos entre Bancos",
      muscleGroup: "Triceps",
      equipment: "Dos bancos planos",
      breathing: "Inhalar al bajar el glúteo hacia el suelo, exhalar al subir",
      technique: "Mantener la espalda lo más cerca posible del banco de apoyo para no sobrecargar el hombro.",
    },
    en: {
      name: "Bench Dips",
      muscleGroup: "Triceps",
      equipment: "Two flat benches",
      breathing: "Inhale as you lower the glute to the floor, exhale as you rise",
      technique: "Keep the back as close as possible to the support bench to avoid overloading the shoulder.",
    }
  },
  {
    id: 16,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=Xaa6rn3Hrh4",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12261301-EZ-Bar-Standing-Overhead-Press_Shoulders_720.gif",
    targetIntensity: "5-8 reps",
    es: {
      name: "Press Militar con Barra",
      muscleGroup: "Hombros",
      equipment: "Barra olímpica",
      breathing: "Exhalar al subir la barra por encima de la cabeza",
      technique: "Apretar glúteos y abdomen (core) para evitar el arqueo excesivo de la zona lumbar.",
    },
    en: {
      name: "Overhead Press",
      muscleGroup: "Shoulders",
      equipment: "Olympic bar",
      breathing: "Exhale as you press the bar overhead",
      technique: "Tighten your glutes and abdomen (core) to avoid excessive arching of the lower back.",
    }
  },
  {
    id: 17,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=DAMw-xGYNck",
    image: "https://fitcron.com/wp-content/uploads/2021/04/42381301-Dumbbell-Seated-Lateral-to-Front-Raise_Shoulders_720.gif",
    targetIntensity: "12-15 reps",
    es: {
      name: "Elevaciones Laterales",
      muscleGroup: "Hombros",
      equipment: "Mancuernas",
      breathing: "Exhalar al elevar lateralmente, inhalar al bajar",
      technique: "No subir las pesas más allá de la línea de los hombros y mantener los meñiques ligeramente hacia arriba."
    },
    en: {
      name: "Lateral Raises",
      muscleGroup: "Shoulders",
      equipment: "Dumbbells",
      breathing: "Exhale as you raise laterally, inhale as you lower",
      technique: "Do not raise the weights beyond the line of the shoulders and keep the pinky fingers slightly upward."
    }
  },
  {
    id: 18,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=pQDrcNoDNVM",
    image: "https://fitcron.com/wp-content/uploads/2021/04/21371301-Dumbbell-Arnold-Press_Shoulders_720.gif",
    targetIntensity: "70-75% 1RM",
    es: {
      name: "Press Arnold",
      muscleGroup: "Hombros",
      equipment: "Mancuernas y banco con respaldo",
      breathing: "Exhalar durante la rotación y el empuje ascendente",
      technique: "La rotación debe ser fluida: comienza con las palmas mirando hacia ti y termina con ellas hacia adelante."
    },
    en: {
      name: "Arnold Press",
      muscleGroup: "Shoulders",
      equipment: "Dumbbells and bench with back support",
      breathing: "Exhale during the rotation and upward push",
      technique: "The rotation should be fluid: start with palms facing you and end with them facing forward."
    }
  },
  {
    id: 19,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=BDYAo6xAO9w",
    image: "https://fitcron.com/wp-content/uploads/2021/04/03781301-Dumbbell-Rear-Fly_Shoulders_720.gif",
    targetIntensity: "RPE 7-8",
    es: {
      name: "Pájaros (Vuelos posteriores)",
      muscleGroup: "Hombros",
      equipment: "Mancuernas",
      breathing: "Exhalar al abrir los brazos",
      technique: "Mantener el torso casi paralelo al suelo y concentrar el tirón en la parte trasera del hombro, no en la espalda."
    },
    en: {
      name: "Rear Flyes",
      muscleGroup: "Shoulders",
      equipment: "Dumbbells",
      breathing: "Exhale as you open your arms",
      technique: "Keep the torso almost parallel to the floor and concentrate the pull on the rear shoulder, not the back."
    }
  },
  {
    id: 20,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=0Po47vvj9g4",
    image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
    targetIntensity: "RPE 7 ",
    es: {
      name: "Face Pull",
      muscleGroup: "Hombros",
      equipment: "Polea alta y cuerda",
      breathing: "Exhalar al tirar de la cuerda hacia la cara",
      technique: "Tirar de la cuerda buscando separar los extremos hacia las orejas, enfatizando la rotación externa."
    },
    en: {
      name: "Face Pull",
      muscleGroup: "Shoulders",
      equipment: "High cable and rope",
      breathing: "Exhale when pulling the rope toward your face",
      technique: "Pull the rope while separating the ends toward your ears, emphasizing external rotation."
    }
  },
  {
    id: 21,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=8mhDd9Ahl1M",
    image: "https://fitcron.com/wp-content/uploads/2021/04/18661301-Wide-Grip-Pull-Up-on-Dip-Cage_Back_720.gif",
    targetIntensity: "19 reps",
    es: {
      name: "Dominadas",
      muscleGroup: "Espalda",
      equipment: "Barra de dominadas",
      breathing: "Exhalar al subir (tracción), inhalar al bajar",
      technique: "Intentar llevar el pecho a la barra, no solo la barbilla, para una mejor activación del dorsal."
    },
    en: {
      name: "Pull-ups",
      muscleGroup: "Back",
      equipment: "Pull-up bar",
      breathing: "Exhale as you pull up (concentric), inhale as you lower",
      technique: "Try to bring your chest to the bar, not just your chin, for better lat activation."
    }
  },
  {
    id: 22,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=I1OsdsuiTOM",
    image: "https://fitcron.com/wp-content/uploads/2021/04/01181301-Barbell-Reverse-Grip-Bent-over-Row_Back-FIX_720.gif",
    targetIntensity: "70-80% 1RM",
    es: {
      name: "Remo con Barra",
      muscleGroup: "Espalda",
      equipment: "Barra olímpica y discos",
      breathing: "Exhalar al tirar de la barra hacia el ombligo",
      technique: "Mantener la espalda neutra (recta) y los hombros lejos de las orejas durante el tirón."
    },
    en: {
      name: "Barbell Row",
      muscleGroup: "Back",
      equipment: "Olympic bar and weight plates",
      breathing: "Exhale as you pull the bar toward your navel",
      technique: "Keep your back neutral (straight) and shoulders away from your ears during the pull."
    }
  },
  {
    id: 23,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=AAYBnWuTZiM",
    image: "https://image.tuasaude.com/media/article/gw/da/jalon-al-pecho_71531.gif?width=686&height=487",
    targetIntensity: "RPE 8",
    es: {
      name: "Jalón al Pecho",
      muscleGroup: "Espalda",
      equipment: "Máquina de jalón y barra larga",
      breathing: "Exhalar al bajar la barra al pecho",
      technique: "No balancear el cuerpo hacia atrás. Controlar el ascenso (fase excéntrica) para estirar bien el dorsal."
    },
    en: {
      name: "Lat Pulldown",
      muscleGroup: "Back",
      equipment: "Lat pulldown machine and long bar",
      breathing: "Exhale as you pull the bar down to your chest",
      technique: "Do not swing your body backward. Control the ascent (eccentric phase) to stretch the lats well."
    }
  },
  {
    id: 24,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=Vm6E-2tq0bU",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12381301-Cable-Seated-Row-Bent-bar_Back_720.gif",
    targetIntensity: "13 reps",
    es: {
      name: "Remo en Polea Baja",
      muscleGroup: "Espalda",
      equipment: "Máquina de remo sentado",
      breathing: "Exhalar al tirar del agarre hacia el abdomen",
      technique: "Evitar mover el tronco hacia adelante y hacia atrás. El movimiento debe nacer de las escápulas."
    },
    en: {
      name: "Seated Cable Row",
      muscleGroup: "Back",
      equipment: "Seated row machine",
      breathing: "Exhale as you pull the handle toward your abdomen",
      technique: "Avoid moving your torso forward and backward. The movement should originate from the scapulae."
    }
  },
  {
    id: 25,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=9YQ1YXKko8s",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbn7LQm_xQr72nW-Az8qzycT7QuFrpGCjolwF4D7El6cLiUj70nry_vbrAG2vqXM-oV1DF1bfAeJxW6XUTow9n9uIxbdEGxG4R4yYun9nDkaCBezCVTih2Q0XitzxPieIH42O8dDtFkEA/s1600/pullover-polea-barra.jpg",
    targetIntensity: "12-15 reps",
    es: {
      name: "Pull-over con Polea Alta",
      muscleGroup: "Espalda",
      equipment: "Polea alta y barra recta",
      breathing: "Exhalar al bajar la barra hacia los muslos",
      technique: "Mantener una pequeña flexión en los codos pero bloqueada. Sentir el estiramiento en los costados."
    },
    en: {
      name: "High Cable Pullover",
      muscleGroup: "Back",
      equipment: "High cable machine and straight bar",
      breathing: "Exhale as you lower the bar toward your thighs",
      technique: "Maintain a slight bend in the elbows but locked. Feel the stretch on the sides."
    }
  },
  {
    id: 26,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=dsCuiccYNGs",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00631301-Barbell-Narrow-Stance-Squat_Thighs_720.gif",
    targetIntensity: "80-90% 1RM",
    es: {
      name: "Sentadilla con Barra",
      muscleGroup: "Piernas",
      equipment: "Barra, discos y Rack de sentadillas",
      breathing: "Inhalar al bajar (maniobra de Valsalva si hay mucha carga), exhalar al subir",
      technique: "Bajar al menos hasta que los muslos estén paralelos al suelo; mantener el peso distribuido en todo el pie."
    },
    en: {
      name: "Barbell Squat",
      muscleGroup: "Legs",
      equipment: "Bar, weight plates and squat rack",
      breathing: "Inhale as you lower (Valsalva maneuver if heavy load), exhale as you rise",
      technique: "Lower at least until your thighs are parallel to the floor; keep weight distributed across the entire foot."
    }
  },
  {
    id: 27,
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=KdT2g0iSdG0",
    image: "https://fitcron.com/wp-content/uploads/2021/04/07401301-Sled-45%C2%B0-Leg-Wide-Press_Thighs_720.gif",
    targetIntensity: "Moderada alta",
    es: {
      name: "Prensa de Piernas",
      muscleGroup: "Piernas",
      equipment: "Máquina de prensa de piernas",
      breathing: "Inhalar al bajar la plataforma, exhalar al empujar",
      technique: "Nunca bloquear las rodillas al final del recorrido y no despegar la zona lumbar del respaldo."
    },
    en: {
      name: "Leg Press",
      muscleGroup: "Legs",
      equipment: "Leg press machine",
      breathing: "Inhale as you lower the platform, exhale as you push",
      technique: "Never lock out your knees at the end of the range and do not lift your lower back off the backrest."
    }
  },
  {
    id: 28,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=4ZDm5EbiFI8",
    image: "https://fitcron.com/wp-content/uploads/2021/04/05851301-Lever-Leg-Extension_Thighs_720.gif",
    targetIntensity: "15-20 reps",
    es: {
      name: "Extensión de Cuádriceps",
      muscleGroup: "Piernas",
      equipment: "Máquina de extensiones",
      breathing: "Exhalar al extender las piernas",
      technique: "Mantener el glúteo bien pegado al asiento para evitar que la cadera compense el movimiento."
    },
    en: {
      name: "Leg Extension",
      muscleGroup: "Legs",
      equipment: "Leg extension machine",
      breathing: "Exhale as you extend your legs",
      technique: "Keep your glutes firmly on the seat to prevent hip compensation during the movement."
    }
  },
  {
    id: 29,
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=VEAv16_YIF0",
    image: "https://static.strengthlevel.com/images/exercises/lying-leg-curl/lying-leg-curl-800.jpg",
    targetIntensity: "RPE 8",
    es: {
      name: "Curl Femoral Tumbado",
      muscleGroup: "Piernas",
      equipment: "Máquina de curl femoral tumbado",
      breathing: "Exhalar al llevar los talones hacia el glúteo",
      technique: "No despegar la pelvis de la almohadilla durante la flexión para evitar tensión lumbar."
    },
    en: {
      name: "Lying Leg Curl",
      muscleGroup: "Legs",
      equipment: "Lying leg curl machine",
      breathing: "Exhale as you bring your heels toward your glutes",
      technique: "Do not lift your pelvis off the pad during flexion to avoid lower back tension."
    }
  },
  {
    id: 30,
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=x7W2BOKWWKs",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00851301-Barbell-Romanian-Deadlift_Hips_720.gif",
    targetIntensity: "75% 1RM",
    es: {
      name: "Peso Muerto Rumano",
      muscleGroup: "Piernas",
      equipment: "Barra olímpica y discos",
      breathing: "Inhalar al bajar, exhalar al recuperar la posición erguida",
      technique: "Bajar la barra pegada a las piernas; el movimiento es de bisagra de cadera (llevar el glúteo hacia atrás)."
    },
    en: {
      name: "Romanian Deadlift",
      muscleGroup: "Legs",
      equipment: "Olympic bar and weight plates",
      breathing: "Inhale as you lower, exhale as you return to standing position",
      technique: "Lower the bar close to your legs; the movement is a hip hinge (push glutes back)."
    }
  }
]

async function main() {
  console.log('🌱 Limpiando ejercicios viejos si existen...');
  await prisma.favorites.deleteMany();
  await prisma.exerciseTranslation.deleteMany();
  await prisma.exercise.deleteMany();

  for (const ex of exercises) {
    const { targetIntensity: _, ...esTranslation } = ex.es;
    const { targetIntensity: __, ...enTranslation } = ex.en;

    await prisma.exercise.create({
      data: {
        difficulty: ex.difficulty,
        video: ex.video,
        image: ex.image,
        targetIntensity: ex.targetIntensity,
        translations: {
          create: [
            { language: 'es', ...esTranslation },
            { language: 'en', ...enTranslation }
          ]
        }
      }
    });
  }

  console.log('✅ Base de datos sembrada con éxito con los ejercicios para las rutinas.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});