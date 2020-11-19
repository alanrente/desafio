<template>
  <div>
    <v-sheet height="630" class="overflow-hidden" style="position: relative">
      <v-app-bar height="60" color="white">
        <v-img max-width="80" src="../assets/symbol.svg"></v-img>
        <v-divider class="mx-10" vertical inset></v-divider>
        <v-btn height="45">
          <v-icon>mdi-security</v-icon>
        </v-btn>
        <v-btn height="45" color="orange darken-2">
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>

        <v-text-field
          label="Pesquisar..."
          append-icon="mdi-magnify"
          single-line
          class="font-italic"
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn height="45" @click.stop="drawer = !drawer">
          <v-icon>mdi-tune</v-icon>
        </v-btn>

        <v-btn height="45" color="#d93067">
          <v-icon color="white">mdi-account</v-icon>
          <v-text
            class="font-weight-regular"
            style="color: white; margin-left: 5px"
            >INCLUIR USUÁRIO</v-text
          >
        </v-btn>
        <v-divider vertical inset class="mx-8"></v-divider>
        <v-icon>mdi-home</v-icon>
        <v-icon>mdi-cog</v-icon>
        <v-icon>mdi-power</v-icon>

      </v-app-bar>

      <v-navigation-drawer
        width="400"
        v-model="drawer"
        absolute
        temporary
        right
      >
        <v-app-bar height="60" color="white">

          <v-icon>mdi-tune</v-icon>
          <v-text class="font-weight-bold" style="margin-left:5px;">FILTROS</v-text>

          <v-spacer></v-spacer>

          <v-btn small height="40" @click.stop="drawer = !drawer">
          <v-icon >mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <v-divider></v-divider>

        <v-btn height="50" block tile>
          <v-icon disabled>mdi-calendar-range</v-icon>
          <v-text style="color:#d93067;">TODAS AS DATAS DE INCLUSÃO</v-text>
          <v-spacer></v-spacer>
          <v-icon disabled>mdi-menu-down</v-icon>
        </v-btn>
        <v-btn height="50" block tile>
          <v-icon disabled>mdi-calendar-range</v-icon>
          <v-text style="color:#d93067;">TODAS AS DATAS DE ALTERAÇÃO</v-text>
          <v-spacer></v-spacer>
          <v-icon disabled>mdi-menu-down</v-icon>
        </v-btn>
        <v-btn height="50" block tile>
          <v-icon disabled>mdi-toggle-switch</v-icon>
          <v-text style="color:#d93067;">ATIVOS E INATIVOS</v-text>
          <v-spacer></v-spacer>
          <v-icon disabled>mdi-menu-down</v-icon>
        </v-btn>

        <v-btn disabled outlined height="60" style="width: 80%; margin: 10%;" tile color="#d93067">
          <v-text>APLICAR</v-text>
        </v-btn>
        
      </v-navigation-drawer>

      <div class="tabela">
        <v-simple-table id="tabela">
          <template v-if="!error">
            <thead>
              <tr>
                <th></th>
                <th class="text-left">USUARIO</th>
                <th class="text-left">EMAIL</th>
                <th class="text-center">DATA DE INCLUSÃO</th>
                <th class="text-center">DATA DE ALTERAÇÃO</th>
                <th class="text-center">REGRAS</th>
                <th class="text-center">STATUS</th>
                <th class="text-center">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in desserts"
                :key="item.usuario"
                :class="item.class"
                :id="item.id"
                @click.stop="apertar(item.id)"
              >
                <td>
                  <div><v-icon>mdi-checkbox-blank-outline</v-icon></div>
                </td>
                <td>
                  <div>{{ item.usuario }}</div>
                </td>
                <td>
                  <div>{{ item.email }}</div>
                </td>
                <td class="text-center">
                  <div>{{ item.dataInclusao }}</div>
                </td>
                <td class="text-center">
                  <div>{{ item.dataAlteracao }}</div>
                </td>
                <td class="text-center">
                  <div>{{ item.regras }}</div>
                </td>
                <td class="status text-center">
                  <div>{{ item.status }}</div>
                </td>
                <td id="tdAcao" class="text-center" style="width: 10%">
                  <div>
                    <v-icon class="">mdi-dots-horizontal</v-icon>
                    <v-icon class="d-none">mdi-delete</v-icon>
                    <v-icon class="d-none">mdi-pencil</v-icon>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-else>
            <v-simple-table
              ><thead class="tabela text-center">
                Lista não localizada
              </thead></v-simple-table
            >
          </template>
        </v-simple-table>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [],
      error: false,
      dialog: false,
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
  created() {
    fetch("http://localhost:8000/usuarios")
      .then((res) => res.json())
      .then(
        (dados) => {
          let lista = dados;
          lista.forEach((dado) => {
            if (Number(dado.id) % 2 == 0) {
              dado.class = "linha-escura";
            } else {
              dado.class = "linha-clara";
            }
          });
          this.desserts = lista;
        },
        () => (this.error = true)
      );
  },
  methods: {
    apertar(id) {
      let tr = document.getElementById(id);
      tr.children.forEach((ele) => {
        if (ele.classList.contains("opaco")) {
          ele.classList.remove("opaco");
        } else if (ele.id != "tdAcao") {
          ele.classList.add("opaco");
        } else {
          ele.children.forEach((elePai) => {
            elePai.children.forEach((eleFilho) => {
              if (eleFilho.classList.contains("d-none")) {
                eleFilho.classList.remove("d-none");
              } else {
                eleFilho.classList.add("d-none");
              }
            });
          });
        }
      });
    },
  },
};
</script>

<style>
.status {
  color: rgb(30, 158, 52);
}

.v-text-field {
  margin: 10px;
  width: 40px;
}

.v-input__control {
  position: relative;
  margin-top: 10%;
}

.tabela {
  border: solid #e6e6e6 25px;
}

.linha-clara {
  background: #eeeeee;
  margin-bottom: 5px;
}

.linha-escura {
  background: #d2d2d3;
  margin-bottom: 5px;
}
.opaco {
  opacity: 10%;
}
</style>