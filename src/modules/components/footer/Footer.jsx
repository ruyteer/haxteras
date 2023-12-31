import React from "react";
import "./styles.css";

function Footer() {
  return (
    <>
      <footer>
        <img src="/logo-1.png" alt="Logo Haxteras" className="logo-footer" />

        <div className="infos-detail">
          <img
            data-aos="flip-right"
            fetchpriority="high"
            src="https://haxtera.com/wp-content/uploads/2023/06/10408-1.png"
            class="attachment-large size-large wp-image-11141"
            alt=""
            style={{ width: "200px" }}
            srcset="https://haxtera.com/wp-content/uploads/2023/06/10408-1.png 285w, https://haxtera.com/wp-content/uploads/2023/06/10408-1-274x300.png 274w"
          />

          <div className="list-messages" data-aos="fade-down-left">
            <div className="messages" data-aos="flip-left">
              <p>Tem alguma dúvida? Entre em contato!</p>
            </div>
            <div className="messages two" data-aos="flip-left">
              <p>Entre no nosso grupo do whatsapp!</p>
              <a href="">
                {" "}
                <img
                  loading="lazy"
                  width="50"
                  height="50"
                  src="https://haxtera.com/wp-content/uploads/2023/06/10481-1.png"
                  class="attachment-large size-large wp-image-11139"
                  alt=""
                />
              </a>
            </div>
            <div className="messages" data-aos="flip-left">
              <p>
                Entre no nosso discord e veja <br /> nossas referências!
              </p>
              <a href="">
                <img
                  loading="lazy"
                  width="50"
                  height="50"
                  src="https://haxtera.com/wp-content/uploads/2023/06/10480-1.png"
                  class="attachment-large size-large wp-image-11140"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: "50px",
            fontWeight: "500",
          }}
        >
          CPNJ: 3573857385
        </p>

        <span>Todos os direitos reservados à Haxteras.</span>
      </footer>
    </>
  );
}

export default Footer;
