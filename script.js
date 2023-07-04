#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5    // Pino SS do módulo RFID
#define RST_PIN 22  // Pino RST do módulo RFID

MFRC522 rfid(SS_PIN, RST_PIN);   // Objeto RFID

const char* ssid = "Rede";
const char* password = "vaisaber";
const char* serverIP = "192.168.235.1";

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  // Inicializa a conexão WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Inicializa o módulo RFID
  SPI.begin();
  rfid.PCD_Init();

  // Rotas do servidor web
  server.on("/cadastrar", HTTP_POST, [](AsyncWebServerRequest *request){
    if (request->hasParam("produto", true) && request->hasParam("quantidade", true)) {
      String produto = request->getParam("produto", true)->value();
      String quantidade = request->getParam("quantidade", true)->value();

      // Verifica a leitura de um cartão RFID
      if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
        String tag = "";
        for (byte i = 0; i < rfid.uid.size; i++) {
          tag += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
          tag += String(rfid.uid.uidByte[i], HEX);
        }

        // Realize as operações necessárias para associar o cartão RFID ao produto e quantidade
        // Salve as informações no arquivo "cartao.txt"
        File file = SPIFFS.open("/cartao.txt", "a");
        if (file) {
          file.println(tag + "," + produto + "," + quantidade);
          file.close();
          request->send(200, "text/plain", "success");
        } else {
          request->send(500, "text/plain", "Erro ao abrir o arquivo");
        }
      } else {
        request->send(400, "text/plain", "Nenhum cartão RFID detectado");
      }
    } else {
      request->send(400, "text/plain", "Parâmetros inválidos");
    }
  });

  server.on("/listar-produtos", HTTP_GET, [](AsyncWebServerRequest *request){
    // Leia o arquivo "cartao.txt" e envie os dados como resposta
    // Certifique-se de definir o cabeçalho "Content-Type" como "text/plain"

    request->send(200, "text/plain", "Dados dos produtos");
  });

  server.on("/remover-produto", HTTP_DELETE, [](AsyncWebServerRequest *request){
    // Realize as operações necessárias para remover o produto associado ao cartão RFID lido
    // Verifique se o cartão está cadastrado no arquivo "cartao.txt" e remova-o

    request->send(200, "text/plain", "success");
  });

  server.begin();
}

void loop
