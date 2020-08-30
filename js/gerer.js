function populate_page(horaires) {

    const departements = [
        {
            name: 'AVO',
            equipes: ['A', 'B', 'C']    
        }, 
        {
            name: 'cariste',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'assemblage',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'cut.print',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'is fin',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'feuilleté.qua',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'str',
            equipes: ['A', 'B']
        },
        {
            name: 'four',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'trempé',
            equipes: ['A', 'B', 'C','D' ,'E']
        },
        {
            name: 'LOGISTIQUE',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'logistique trempé',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'logistique AVO',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'LABO.QUALITE',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'menage',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'MAINTENANCE Layati',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'MAINTENANCE Lemlih',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'Tooling',
            equipes: ['A', 'B', 'C', 'D']
        },
        {
            name: 'securité',
            equipes: ['A', 'B', 'C']
        },
        {
            name: 'sous traitant',
            equipes: ['A']
        }
    ];

    departements.forEach(function(dep){    
        let html_fieldset = document.createElement('fieldset');

        let html_legend = document.createElement('legend');
        html_legend.innerText = dep.name;

        let html_table = document.createElement('table');

        dep.equipes.forEach(function(equipe){
            let html_tr = document.createElement('tr');
            let html_td1 = document.createElement('td');

            let html_label = document.createElement('label');
            html_label.innerText = 'EQUIPE ' + equipe;

            let html_td2 = document.createElement('td');
            let html_select = document.createElement('select');
            html_select.id = dep.name + "-" + equipe;
            
            horaires.forEach(function(horaire){
                let option = document.createElement('option');
                option.value = horaire;
                option.innerText = horaire;
                html_select.appendChild(option);
            });

            html_td2.appendChild(html_select);
            html_td1.appendChild(html_label);

            html_tr.appendChild(html_td1);
            html_tr.appendChild(html_td2);  
            
            html_table.appendChild(html_tr);
        })

        html_fieldset.appendChild(html_legend);
        html_fieldset.appendChild(html_table);
        document.getElementById('form-update').appendChild(html_fieldset);
        
    })
}

function save_horraire(db) {
    let sels = document.getElementsByTagName('select');
    for(let i=0; i<sels.length; i++) {
        let departement = sels[i].id.split('-')[0];
        let equipe = sels[i].id.split('-')[1];
        let horaire = sels[i].value;

        db.collection('personne').where("departement", "==", departement).where("equipe", "==", equipe)
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    db.collection('personne').doc(doc.id).update({horaire: horaire})
                });
            })
            .catch(function(error){
                alert("Error getting Document", error);
            })
    }
}

function translat(hor){

    let heure;
    if (hor=='8:30'){
        heure=new Array("H.A", "morning", "half.day.morning");
    }
    else if(hor=='16:30'){
        heure= new Array("afternoon");
    }
    else if(hor=='20:30'){
        heure= new Array("half.day.night");
    }
    else {
        heure= new Array("night");
    }
    return heure;
}

function tableau(db,horaires,trajets){
    trajets.forEach(trajet => {
        let html_tr1 = document.createElement('tr');
        let html_td4 = document.createElement('td');
        html_td4.innerText=trajet;
        html_tr1.appendChild(html_td4);
        
        horaires.forEach(horaire => { 
            real_horaire = translat(horaire);
            db.collection('personne').where("horaire", "in", real_horaire).where("trajet", "==", trajet)
            .get()
            .then(function(querySnapshot){
                n = querySnapshot.size;
                console.log(n);
                let html_td3 = document.createElement('td');
                html_td3.innerText = horaire + '=>' + n;
                html_tr1.appendChild(html_td3);
                // console.log(n)
                document.getElementById('tab').appendChild(html_tr1);
            }).catch(function(error){
                console.log("Error getting Document", error);
            })
        });
    });
}
function checkUser(){
    firebase.auth().onAuthStateChanged(function(firebaseUser){
        if (firebaseUser) {
    console.log(firebaseUser);
}else{
    console.log("you are not logged in");
}
    });
};
