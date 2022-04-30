/* Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti


SUPER-BONUS:
● evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
● A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
● predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
● visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
● inserire l'orario corretto nei messaggi (v. note day.js)


*/

const app = new Vue({
    el: "#app",
    data: {
        active: 0,
        textMyMessage: '',
        searchFilter: '',
        activeMessage: {
            counter: null,
            show: false,
        },

        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },

    methods: {

        //imposto una funzione con parametro index che prenda l'elemento nella posizione active corrispondente e ne attribuisca il valore come index
        chat_selected(index) {

            this.active = index;
            console.log(index);

            //imposto condizioni per evitare bug nei menu a tendina per la rimozione dei messaggi alla selezione delle chat (milestone 5)
            this.activeMessage.counter = false;
            this.activeMessage.show = false;
        },

        sendMyMessage() {
            console.log('enter click')
                /* console.log(dayjs()) */

            //bonus ora corrente, messaggi utente

            const newDate = dayjs().format('DD/MM/YYYY' + ' ' + 'HH:mm:ss');
            console.log(newDate)

            //dichiaro una variabile che inizializzo con il nuovo oggetto

            const newMessage = {
                date: newDate,
                message: this.textMyMessage,
                status: 'sent'

            }

            //bonus: imposto condizione per evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi;

            //imposto una condizione nel caso l'input sia una stringa vuota non deve essere pushato all'enter click

            let noEmptyMessage = this.textMyMessage.trimStart() /* <-- trimStart() metodo che elimina spazi iniziali in una stringa */

            if (noEmptyMessage != '') {

                //pusho l'oggetto con il nuovo messaggio nell'array messages
                this.contacts[this.active].messages.push(newMessage);

                //faccio il clear dell'input
                this.textMyMessage = ''

                /* this.receivedBotMessage() */

                //imposto il metodo affinchè mi restituisca la risposta della funzione richiamata dopo che sia passato 1 sec
                setTimeout(this.receivedBotMessage, 1000);

            }

        },

        //funzione che mi restituisce una risposta automatica settata su 'ok'
        receivedBotMessage() {

            //bonus oa corrente per i messaggi automatici

            const newBotDate = dayjs().format('DD/MM/YYYY' + ' ' + 'HH:mm:ss');

            const botMessage = [{
                    date: newBotDate,
                    message: 'ok',
                    status: 'received'
                },
                {
                    date: newBotDate,
                    message: 'come posso esserti utile?',
                    status: 'received'
                },
                {
                    date: newBotDate,
                    message: 'vuoi effettuare una ricerca?',
                    status: 'received'
                },
                {
                    date: newBotDate,
                    message: 'ciao',
                    status: 'received'
                }

            ]

            //bonus

            //imposto una variabile che ha come valore un oggetto di un array preso in modo randomico
            let mexBot = botMessage[Math.floor(Math.random() * botMessage.length)];
            /* console.log(mexBot) */

            //pusho l'oggetto con il messaggio automatico di risposta nell'array messages
            this.contacts[this.active].messages.push(mexBot);

            /* this.contacts[this.active].messages.push(botMessage); */

        },


        dropOn(index) {

            //verifico il click e l'index in console

            console.log('click', index);

            //inserisco il valore dell'index nella variabile creata nell'oggetto
            this.activeMessage.counter = index;

            //verifico in console
            console.log(this.activeMessage.counter)


            //imposto una condizione che alterni i valori booleani nella mia variabile al click
            if (this.activeMessage.show == false) {

                this.activeMessage.show = true;

            } else {

                this.activeMessage.show = false;
            }

            /*  if (this.activeMessage.counter === index) {

                 this.activeMessage.counter = false;

                 this.activeMessage.show = false;


                 return

             }
             this.activeMessage.counter = index;
             this.activeMessage.show = true; */

            //verifico il valore booleano restituito in console
            console.log(this.activeMessage.show)

        },


        //imposto una funzione per la cancellazione dei messaggi
        deleteMessage(index) {

            this.activeMessage.show = false;

            this.contacts[this.active].messages.splice(index, 1)

        },

        //imposto una funzione per la ricerca degli utenti
        searchContacts() {

            /*  console.log('click') */

            //imposto un ciclo nei contatti
            this.contacts.forEach(contact => {

                //imposto una condizione che controlli se i nomi dei contatti corrispondano alla ricerca effettuata nell'input

                if (contact.name.toLowerCase().includes(this.searchFilter.toLowerCase())) {

                    //se la condizione si verifica setto un valore su visible 
                    contact.visible = true;
                } else {

                    //se la condizione non si verifica setto un altro valore boleano su visible
                    contact.visible = false;
                }

            })
        }

    }

})