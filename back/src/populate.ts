import logger from './util/logger';
import {Questionary} from './api/models/Questions';
import mongoose from 'mongoose';
import {MONGODB_URI} from './util/secrets';


const populate = async (): Promise<void> => {
    logger.info('Connecting..');
    try {
        await mongoose.connect(MONGODB_URI + '', {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (e) {
        throw new Error('Error while connecting to the database');
    }

    logger.info('Deleting Collections..');
    try {
        await Questionary.collection.drop();
    } catch (err) {
        logger.info('No Collections found');
    }

    logger.info('Populating..');
    const first = new Questionary({
        timer: 200,
        questions: [
            {
                question: 'Líquido graso de color verde amarillento que se obtiene prensando las aceitunas.',
                result: 'Aceite'
            },
            {
                question: 'Abertura por donde se echan las cartas por el correo.',
                result: 'Buzón'
            },
            {
                question: 'Ropa deportiva que consta de un pantalón y una chaqueta o jersey amplios.',
                result: 'Chándal'
            },
            {
                question: 'Dedicado con fervor a obras de piedad y religión.',
                result: 'Devoto'
            },
            {
                question: 'Se dice de la leche que conserva toda la grasa y sustancias nutritivas.',
                result: 'Entera'
            },
            {
                question: 'Perteneciente o relativo a los bosques y a los aprovechamientos de leñas o pastos.',
                result: 'Forestal'
            },
            {
                question: 'Coloquialmente canto fúnebre con el que se acompañan los entierros.',
                result: 'Gorigori'
            },
            {
                question: 'Adorno especial de los vestidos en la parte correspondiente a los hombros.',
                result: 'Hombrera'
            },
            {
                question: 'Percibir íntima e instantáneamente una idea o verdad tal como si se la tuviera a la vista.',
                result: 'Intuir'
            },
            {
                question: 'Tiempo de duración del trabajo diario.',
                result: 'Jornada'
            },
            {
                question: 'LETRA K',
                result: 'K'
            },
            {
                question: 'Apellido del poeta ruso autor de la obra La muerte del poeta de 1837.',
                result: 'Lérmontov'
            },
            {
                question: 'Se dice de una persona que no ha alcanzado la mayoría de edad.',
                result: 'Menor'
            },
            {
                question: 'Cada una de las fabulosas deidades de las aguas, bosques o selva.',
                result: 'Ninfa'
            },
            {
                question: 'Mentira o noticia fabulosa de pura invención.',
                result: 'Patraña'
            },
            {
                question: 'Empleado que en ciertas oficinas desempeña funciones subalternas.',
                result: 'Ordenanza'
            },
            {
                question: 'Anterioridad de algo respecto de otra cosa en tiempo u orden.',
                result: 'Prioridad'
            },
            {
                question: 'Órgano respiratorio de los peces formado por láminas o filamentos.',
                result: 'Branquia'
            },
            {
                question: 'Apellido del ingeniero francés que, junto a Arthur C. Krebs, construyó el dirigible militar La France en 1884.',
                result: 'Renard'
            },
            {
                question: 'Danza popular brasileña de influencia africana cantada de compás binario.',
                result: 'Samba'
            },
            {
                question: 'Máquina de juegos de azar que funciona introduciendo monedas.',
                result: 'Tragaperras'
            },
            {
                question: 'Atribuirse y usar un título o cargo ajeno como si fuera propio.',
                result: 'Usurpar'
            },
            {
                question: 'Lugar cerrado o cubierto construido para ser habitado por personas.',
                result: 'Vivienda'
            },
            {
                question: 'LETRA W',
                result: 'W'
            },
            {
                question: 'Ciudad inglesa cuya universidad compite cada año en una popular regata contra la universidad de Cambridge.',
                result: 'Oxford'
            },
            {
                question: 'Persona que aplica el derecho sin rigor y desenfadadamente.',
                result: 'Leguleyo'
            },
            {
                question: 'Movimiento repetido y violento de un lado a otro.',
                result: 'Zarandeo'
            },
        ]
    });
    await first.save();
};

populate().then(r => {
    logger.info('Success!');
}).catch((e: Error) => {
    logger.error(e.message);
}).finally(() => {
    process.exit();
});
