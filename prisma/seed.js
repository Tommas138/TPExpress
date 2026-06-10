const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const exercises = [
  {
    id: 1,
    name: "Press de Banca Plano",
    muscleGroup: "Pecho",
    equipment: "Barra olímpica, discos y banco plano",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=TAH8RxOS0VI",
    breathing: "Inhalar al bajar la barra al pecho, exhalar con fuerza durante el empuje (fase concéntrica)",
    image: "https://fitcron.com/wp-content/uploads/2021/03/00251301-Barbell-Bench-Press_Chest-FIX_720.gif",
    technique: "Mantener retracción escapular, pies apoyados firmemente y evitar el rebote en el esternón.",
    targetIntensity: "75-85% 1RM"
  },
  {
    id: 2,
    name: "Aperturas con Mancuernas",
    muscleGroup: "Pecho",
    equipment: "Mancuernas y banco plano",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=eGjt4lk6g34",
    breathing: "Inhalar al abrir los brazos (estiramiento), exhalar al juntar las mancuernas arriba",
    image: "https://fitcron.com/wp-content/uploads/2021/03/03081301-Dumbbell-Fly_Chest-FIX_720.gif",
    technique: "Mantener una ligera flexión en los codos para proteger la articulación; el movimiento es circular, no de empuje.",
    targetIntensity: "60-70% 1RM (Enfoque en volumen)"
  },
  {
    id: 3,
    name: "Press Inclinado con Máquina",
    muscleGroup: "Pecho",
    equipment: "Máquina de press inclinado (Hammer o similar)",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=WN-kgjtQy8s",
    breathing: "Inhalar en el descenso controlado, exhalar al extender los brazos",
    image: "https://fitcron.com/wp-content/uploads/2021/03/14791301-Lever-Incline-Chest-Press_Chest_720.gif",
    technique: "Ajustar el asiento para que los agarres queden a la altura de la parte superior del pectoral.",
    targetIntensity: "RPE 8-9"
  },
  {
    id: 4,
    name: "Cruce de Poleas",
    muscleGroup: "Pecho",
    equipment: "Máquina de poleas cruzadas",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=WNtBIde3Qks",
    breathing: "Exhalar al cruzar los cables frente al cuerpo, inhalar al regresar a la posición inicial",
    image: "https://fitcron.com/wp-content/uploads/2021/03/01881301-Cable-Middle-Fly_Chest_720.gif",
    technique: "Mantener el torso ligeramente inclinado y apretar el pectoral un second en el punto de máxima contracción.",
    targetIntensity: "Moderada (12-15 reps)"
  },
  {
    id: 5,
    name: "Fondos en Paralelas",
    muscleGroup: "Pecho",
    equipment: "Barras paralelas o estación de fondos",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=fJ5QdPGMkiY",
    breathing: "Inhalar al bajar, exhalar al subir",
    image: "https://fitcron.com/wp-content/uploads/2021/03/02511301-Chest-Dip_Chest_720.gif",
    technique: "Inclinar el torso hacia adelante para priorizar el pecho; si el torso está vertical, trabajará más el tríceps.",
    targetIntensity: "Peso corporal hasta el fallo técnico"
  },
  {
    id: 6,
    name: "Curl de Bíceps con Barra",
    muscleGroup: "Biceps",
    equipment: "Barra EZ o barra recta",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=no-dXip-rJM",
    breathing: "Exhalar al subir la barra, inhalar al bajar de forma controlada",
    image: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Curl_f38580d5-412e-4082-b453-5d319afa94fd_600x600.png?v=1612137128",
    technique: "Evitar el balanceo del tronco. Mantener los codos pegados a los costados en todo momento.",
    targetIntensity: "70-80% 1RM"
  },
  {
    id: 7,
    name: "Curl Martillo con Mancuernas",
    muscleGroup: "Biceps",
    equipment: "Mancuernas",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=j99intoPKGE",
    breathing: "Exhalar en la fase de esfuerzo, inhalar al descender",
    image: "https://fitcron.com/wp-content/uploads/2021/04/02981301-Dumbbell-Cross-Body-Hammer-Curl_Forearms_720.gif",
    technique: "Mantener el agarre neutro (palmas enfrentadas). No rotar las muñecas durante el trayecto.",
    targetIntensity: "Moderada alta (10-12 reps)"
  },
  {
    id: 8,
    name: "Curl en Banco Scott",
    muscleGroup: "Biceps",
    equipment: "Banco Scott (predicador) y barra EZ",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=AsipeZH23EY",
    breathing: "Inhalar al bajar la barra, exhalar al subir",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00811301-Barbell-Reverse-Preacher-Curl_Forearm_720.gif",
    technique: "Evitar la extensión total brusca del codo al bajar para prevenir lesiones en el tendón del bíceps.",
    targetIntensity: "RPE 7-8"
  },
  {
    id: 9,
    name: "Curl Concentrado",
    muscleGroup: "Biceps",
    equipment: "Mancuerna y banco",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=Is3JRhq37o4",
    breathing: "Exhalar al contraer el bíceps, inhalar al estirar",
    image: "https://fitcron.com/wp-content/uploads/2021/04/02971301-Dumbbell-Concentration-Curl_Upper-Arms_720.gif",
    technique: "Apoyar el tríceps contra la cara interna del muslo, no encima de la pierna, para un aislamiento real.",
    targetIntensity: "Alta repetición (12-15 reps)"
  },
  {
    id: 10,
    name: "Curl en Polea Alta",
    muscleGroup: "Biceps",
    equipment: "Máquina de poleas cruzadas",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=SykZPuLKj14",
    breathing: "Exhalar al llevar las manos hacia las orejas",
    image: "https://eresfitness.com/wp-content/uploads/Curl-de-biceps-con-polea-alta.webp",
    technique: "Mantener los brazos paralelos al suelo y los hombros estables. Imagina que haces una pose de competición.",
    targetIntensity: "Tensión constante (RPE 8)"
  },
  {
    id: 11,
    name: "Press Francés",
    muscleGroup: "Triceps",
    equipment: "Barra EZ y banco plano",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=PTO862T8U7Y",
    breathing: "Inhalar al bajar la barra hacia la frente, exhalar al extender",
    image: "https://fitcron.com/wp-content/uploads/2021/03/04481301-EZ-Barbell-Decline-Close-grip-Face-Press_Triceps_720.gif",
    technique: "Los codos deben apuntar siempre al techo y no abrirse hacia afuera durante la ejecución.",
    targetIntensity: "70% 1RM"
  },
  {
    id: 12,
    name: "Extensión en Polea Alta",
    muscleGroup: "Triceps",
    equipment: "Polea alta con cuerda o barra recta",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=Zj1h0ObPsp8",
    breathing: "Exhalar al empujar hacia abajo, inhalar al subir",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12271301-Cable-Standing-One-Arm-Tricep-Pushdown-Overhand-Grip_Upper-Arms_720.gif",
    technique: "Si usas cuerda, separa los extremos al final del movimiento para maximizar la contracción del tríceps.",
    targetIntensity: "Bombeo (12-20 reps)"
  },
  {
    id: 13,
    name: "Press Cerrado",
    muscleGroup: "Triceps",
    equipment: "Barra olímpica y banco plano",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=o9_9RveIa74",
    breathing: "Inhalar al bajar, exhalar al extender con potencia",
    image: "https://eresfitness.com/wp-content/uploads/2019/11/Press-de-banca-con-agarre-cerrado.jpg",
    technique: "El agarre debe ser al ancho de los hombros; no pongas las manos demasiado juntas o te dolerán las muñecas.",
    targetIntensity: "80-85% 1RM"
  },
  {
    id: 14,
    name: "Patada de Tríceps",
    muscleGroup: "Triceps",
    equipment: "Mancuerna",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=tZyWUViSqT4",
    breathing: "Exhalar al extender el brazo hacia atrás",
    image: "https://fitcron.com/wp-content/uploads/2021/04/03331301-Dumbbell-Kickback_Upper-Arms_720.gif",
    technique: "Mantener el brazo paralelo al suelo; solo se mueve el antebrazo. Bloquear el codo un segundo atrás.",
    targetIntensity: "Baja (15+ reps)"
  },
  {
    id: 15,
    name: "Fondos entre Bancos",
    muscleGroup: "Triceps",
    equipment: "Dos bancos planos",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=Zd0gP_QvWGA",
    breathing: "Inhalar al bajar el glúteo hacia el suelo, exhalar al subir",
    image: "https://fitcron.com/wp-content/uploads/2021/03/08121301-Triceps-Dip-bench-leg_Upper-Arms_720.gif",
    technique: "Mantener la espalda lo más cerca posible del banco de apoyo para no sobrecargar el hombro.",
    targetIntensity: "Fallo técnico"
  },
  {
    id: 16,
    name: "Press Militar con Barra",
    muscleGroup: "Hombros",
    equipment: "Barra olímpica",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=Xaa6rn3Hrh4",
    breathing: "Exhalar al subir la barra por encima de la cabeza",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12261301-EZ-Bar-Standing-Overhead-Press_Shoulders_720.gif",
    technique: "Apretar glúteos y abdomen (core) para evitar el arqueo excesivo de la zona lumbar.",
    targetIntensity: "Fuerza (5-8 reps)"
  },
  {
    id: 17,
    name: "Elevaciones Laterales",
    muscleGroup: "Hombros",
    equipment: "Mancuernas",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=DAMw-xGYNck",
    breathing: "Exhalar al elevar lateralmente, inhalar al bajar",
    image: "https://fitcron.com/wp-content/uploads/2021/04/42381301-Dumbbell-Seated-Lateral-to-Front-Raise_Shoulders_720.gif",
    technique: "No subir las pesas más allá de la línea de los hombros y mantener los meñiques ligeramente hacia arriba.",
    targetIntensity: "Moderada (12-15 reps)"
  },
  {
    id: 18,
    name: "Press Arnold",
    muscleGroup: "Hombros",
    equipment: "Mancuernas y banco con respaldo",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=pQDrcNoDNVM",
    breathing: "Exhalar durante la rotación y el empuje ascendente",
    image: "https://fitcron.com/wp-content/uploads/2021/04/21371301-Dumbbell-Arnold-Press_Shoulders_720.gif",
    technique: "La rotación debe ser fluida: comienza con las palmas mirando hacia ti y termina con ellas hacia adelante.",
    targetIntensity: "70-75% 1RM"
  },
  {
    id: 19,
    name: "Pájaros (Vuelos posteriores)",
    muscleGroup: "Hombros",
    equipment: "Mancuernas",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=BDYAo6xAO9w",
    breathing: "Exhalar al abrir los brazos",
    image: "https://fitcron.com/wp-content/uploads/2021/04/03781301-Dumbbell-Rear-Fly_Shoulders_720.gif",
    technique: "Mantener el torso casi paralelo al suelo y concentrar el tirón en la parte trasera del hombro, no en la espalda.",
    targetIntensity: "Baja carga / Alta repetición"
  },
  {
    id: 20,
    name: "Face Pull",
    muscleGroup: "Hombros",
    equipment: "Polea alta y cuerda",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=0Po47vvj9g4",
    breathing: "Exhalar al tirar de la cuerda hacia la cara",
    image: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
    technique: "Tirar de la cuerda buscando separar los extremos hacia las orejas, enfatizando la rotación externa.",
    targetIntensity: "RPE 7 (Salud articular)"
  },
  {
    id: 21,
    name: "Dominadas",
    muscleGroup: "Espalda",
    equipment: "Barra de dominadas",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=8mhDd9Ahl1M",
    breathing: "Exhalar al subir (tracción), inhalar al bajar",
    image: "https://fitcron.com/wp-content/uploads/2021/04/18661301-Wide-Grip-Pull-Up-on-Dip-Cage_Back_720.gif",
    technique: "Intentar llevar el pecho a la barra, no solo la barbilla, para una mejor activación del dorsal.",
    targetIntensity: "Fallo técnico"
  },
  {
    id: 22,
    name: "Remo con Barra",
    muscleGroup: "Espalda",
    equipment: "Barra olímpica y discos",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=I1OsdsuiTOM",
    breathing: "Exhalar al tirar de la barra hacia el ombligo",
    image: "https://fitcron.com/wp-content/uploads/2021/04/01181301-Barbell-Reverse-Grip-Bent-over-Row_Back-FIX_720.gif",
    technique: "Mantener la espalda neutra (recta) y los hombros lejos de las orejas durante el tirón.",
    targetIntensity: "70-80% 1RM"
  },
  {
    id: 23,
    name: "Jalón al Pecho",
    muscleGroup: "Espalda",
    equipment: "Máquina de jalón y barra larga",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=AAYBnWuTZiM",
    breathing: "Exhalar al bajar la barra al pecho",
    image: "https://image.tuasaude.com/media/article/gw/da/jalon-al-pecho_71531.gif?width=686&height=487",
    technique: "No balancear el cuerpo hacia atrás. Controlar el ascenso (fase excéntrica) para estirar bien el dorsal.",
    targetIntensity: "RPE 8"
  },
  {
    id: 24,
    name: "Remo en Polea Baja",
    muscleGroup: "Espalda",
    equipment: "Máquina de remo sentado",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=Vm6E-2tq0bU",
    breathing: "Exhalar al tirar del agarre hacia el abdomen",
    image: "https://fitcron.com/wp-content/uploads/2021/04/12381301-Cable-Seated-Row-Bent-bar_Back_720.gif",
    technique: "Evitar mover el tronco hacia adelante y hacia atrás. El movimiento debe nacer de las escápulas.",
    targetIntensity: "Moderada alta"
  },
  {
    id: 25,
    name: "Pull-over con Polea Alta",
    muscleGroup: "Espalda",
    equipment: "Polea alta y barra recta",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=9YQ1YXKko8s",
    breathing: "Exhalar al bajar la barra hacia los muslos",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbn7LQm_xQr72nW-Az8qzycT7QuFrpGCjolwF4D7El6cLiUj70nry_vbrAG2vqXM-oV1DF1bfAeJxW6XUTow9n9uIxbdEGxG4R4yYun9nDkaCBezCVTih2Q0XitzxPieIH42O8dDtFkEA/s1600/pullover-polea-barra.jpg",
    technique: "Mantener una pequeña flexión en los codos pero bloqueada. Sentir el estiramiento en los costados.",
    targetIntensity: "12-15 reps (Enfoque metabólico)"
  },
  {
    id: 26,
    name: "Sentadilla con Barra",
    muscleGroup: "Piernas",
    equipment: "Barra, discos y Rack de sentadillas",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=dsCuiccYNGs",
    breathing: "Inhalar al bajar (maniobra de Valsalva si hay mucha carga), exhalar al subir",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00631301-Barbell-Narrow-Stance-Squat_Thighs_720.gif",
    technique: "Bajar al menos hasta que los muslos estén paralelos al suelo; mantener el peso distribuido en todo el pie.",
    targetIntensity: "80-90% 1RM"
  },
  {
    id: 27,
    name: "Prensa de Piernas",
    muscleGroup: "Piernas",
    equipment: "Máquina de prensa de piernas",
    difficulty: "2",
    video: "https://www.youtube.com/watch?v=KdT2g0iSdG0",
    breathing: "Inhalar al bajar la plataforma, exhalar al empujar",
    image: "https://fitcron.com/wp-content/uploads/2021/04/07401301-Sled-45%C2%B0-Leg-Wide-Press_Thighs_720.gif",
    technique: "Nunca bloquear las rodillas al final del recorrido y no despegar la zona lumbar del respaldo.",
    targetIntensity: "Moderada alta"
  },
  {
    id: 28,
    name: "Extensión de Cuádriceps",
    muscleGroup: "Piernas",
    equipment: "Máquina de extensiones",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=4ZDm5EbiFI8",
    breathing: "Exhalar al extender las piernas",
    image: "https://fitcron.com/wp-content/uploads/2021/04/05851301-Lever-Leg-Extension_Thighs_720.gif",
    technique: "Mantener el glúteo bien pegado al asiento para evitar que la cadera compense el movimiento.",
    targetIntensity: "Fallo metabólico (15-20 reps)"
  },
  {
    id: 29,
    name: "Curl Femoral Tumbado",
    muscleGroup: "Piernas",
    equipment: "Máquina de curl femoral tumbado",
    difficulty: "1",
    video: "https://www.youtube.com/watch?v=VEAv16_YIF0",
    breathing: "Exhalar al llevar los talones hacia el glúteo",
    image: "https://static.strengthlevel.com/images/exercises/lying-leg-curl/lying-leg-curl-800.jpg",
    technique: "No despegar la pelvis de la almohadilla durante la flexión para evitar tensión lumbar.",
    targetIntensity: "RPE 8"
  },
  {
    id: 30,
    name: "Peso Muerto Rumano",
    muscleGroup: "Piernas",
    equipment: "Barra olímpica y discos",
    difficulty: "3",
    video: "https://www.youtube.com/watch?v=x7W2BOKWWKs",
    breathing: "Inhalar al bajar, exhalar al recuperar la posición erguida",
    image: "https://fitcron.com/wp-content/uploads/2021/04/00851301-Barbell-Romanian-Deadlift_Hips_720.gif",
    technique: "Bajar la barra pegada a las piernas; el movimiento es de bisagra de cadera (llevar el glúteo hacia atrás).",
    targetIntensity: "75% 1RM"
  }
]

async function main() {
  console.log('🌱 Limpiando ejercicios viejos si existen...');
  await prisma.exercise.deleteMany();

  console.log('🏋️‍♂️ Cargando base de datos de ejercicios...');
  await prisma.exercise.createMany({
    data: exercises
  });

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