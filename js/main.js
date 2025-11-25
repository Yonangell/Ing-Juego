class Personajes {
  constructor(nombre) {
    this.nombre = nombre;
    
    let valorMaximo = 10;

    this.atk = Math.floor(Math.random() * valorMaximo) + 1;
    this.def = Math.floor(Math.random() * valorMaximo) + 1;
    this.spd = Math.floor(Math.random() * valorMaximo) + 1;
    this.hp = 100;

    this.habilidades = [];
  }

  atacar(objetivoMilitar, habilidad) {
    let danoInicial = this.atk * habilidad.modificador;
    let danoFinal = Math.max(0, danoInicial - objetivoMilitar.def);

    objetivoMilitar.hp -= danoFinal;
    if (objetivoMilitar.hp < 0) {
      objetivoMilitar.hp = 0;
    }

    console.log(
      this.nombre +
        " utilizo " +
        habilidad.nombre +
        " en " +
        objetivoMilitar.nombre
    );
    console.log("Infligio un daño de " + danoFinal.toFixed(1));
    console.log(
      "El HP restante del jugador " +
        objetivoMilitar.nombre +
        " es " +
        objetivoMilitar.hp.toFixed(1) + "/100 " 
    );
  }

  escogerHabilidadAleatoria() {
    let indice = Math.floor(Math.random() * this.habilidades.length);
    return this.habilidades[indice];
  }
}

class Guerrero extends Personajes {
  constructor(nombre) {
    super(nombre);
    this.habilidades = [
      {
        nombre: "Rasenga",
        modificador: 1.9,
      },
      {
        nombre: "Golpe catastrofico",
        modificador: 1.4,
      },
      {
        nombre: "Patada Mortal",
        modificador: 1.5,
      },
    ];
  }
}

class Mago extends Personajes {
  constructor(nombre) {
    super(nombre);
    this.habilidades = [
      {
        nombre: "Lluvia de fuego",
        modificador: 1.6,
      },
      {
        nombre: "Telequinesis",
        modificador: 1.4,
      },
      {
        nombre: "Curacion",
        modificador: 1.5,
      },
    ];
  }
}

class Arquero extends Personajes {
  constructor(nombre) {
    super(nombre);
    this.habilidades = [
      {
        nombre: "Movilidad Sigilosa",
        modificador: 1.3,
      },
      {
        nombre: "Flecha relampago",
        modificador: 1.6,
      },
      {
        nombre: "Lluvia de Flechas",
        modificador: 1.5,
      },
    ];
  }
}

class EmpezarAutoBatalla {
  constructor() {
    this.guerreros = [];
  }

  inicializarGuerreros() {
    this.guerreros.push(new Guerrero("Kratos el terror de los dioses griegos"));
    this.guerreros.push(new Arquero("Legolas el terror de los orcos"));
    this.guerreros.push(new Mago("Gandlf el gris"));
    this.guerreros.push(new Guerrero("Aquiles el semidios perfecto"));
    this.guerreros.push(new Guerrero("Leonidas el grande"));
    this.guerreros.push(new Mago("Orko"));
    this.guerreros.push(new Arquero("Robin hood"));

    console.log("== Guerra a muerte ==");
    this.guerreros.forEach(p =>
      console.log(
        "Nombre: " +
          p.nombre +
          ". Puntos de vida: " +
          p.hp +
          ", Ataque: " +
          p.atk +
          ", Defensa: " +
          p.def +
          ", Velocidad: " +
          p.spd
      )
    );
    console.log("\n");
  }

  empezarBatalla() {
    let ronda = 1;

    while (this.guerreros.length > 1) {
      console.log("\nRonda " + ronda );

      this.guerreros.sort((a, b) => b.spd - a.spd);

      for (let atacante of this.guerreros) {
        if (atacante.hp <= 0 || this.guerreros.lenght <= 1) continue;

        let posiblesObjetivos = this.guerreros.filter(
          p => p !== atacante && p.hp > 0
        );
        if (posiblesObjetivos.length === 0) continue;

        let indiceMilitar = Math.floor(
          Math.random() * posiblesObjetivos.length
        );
        let objetivo = posiblesObjetivos[indiceMilitar];

        let habilidad = atacante.escogerHabilidadAleatoria();

        atacante.atacar(objetivo, habilidad);

        this.guerreros = this.guerreros.filter(p => p.hp > 0);
      }

      ronda++;
    }

    if (this.guerreros.length === 1) {
      console.log("\n=====================");
      console.log(
        "Termino la batalla, el ganador es: " + this.guerreros[0].nombre
      );
      console.log("===============================");
    } else {
      console.log("Ha habido un empate");
    }
  }

  empezarJuego() {
    this.inicializarGuerreros();
    this.empezarBatalla();
  }
}

let juego = new EmpezarAutoBatalla();
juego.empezarJuego();
