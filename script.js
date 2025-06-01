console.log("script.js loaded");

document
  .querySelectorAll('input[type="radio"].dark-theme-radio')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      console.log("Radio changed:", this.value);

      document
        .querySelectorAll(`input[name="${this.name}"].dark-theme-radio`)
        .forEach((sib) => {
          const sibGroup = sib.closest(".group");
          if (!sibGroup) return;

          const sibIndicator = sibGroup.querySelector(
            ".radio-checked-indicator"
          );
          const sibLabel = sibGroup.querySelector("label");
          const sibVisualOuter = sibGroup.querySelector(
            ".radio-visual-indicator > span:first-child"
          );

          if (sibIndicator) {
            sibIndicator.classList.remove("bg-yellow-400");
            sibIndicator.classList.add("bg-transparent");
          }
          sibGroup.classList.remove("bg-gray-750", "active-radio-group");
          if (sibLabel) {
            sibLabel.classList.remove("text-yellow-300");
            sibLabel.classList.add("text-gray-200");
          }
          if (sibVisualOuter) {
            sibVisualOuter.classList.remove("border-yellow-400");
            sibVisualOuter.classList.add("border-gray-500");
          }
        });

      const currentGroup = this.closest(".group");
      if (!currentGroup) return;

      const currentIndicator = currentGroup.querySelector(
        ".radio-checked-indicator"
      );
      const currentLabel = currentGroup.querySelector("label");
      const currentVisualOuter = currentGroup.querySelector(
        ".radio-visual-indicator > span:first-child"
      );

      if (this.checked) {
        if (currentIndicator) {
          currentIndicator.classList.add("bg-yellow-400");
          currentIndicator.classList.remove("bg-transparent");
        }
        currentGroup.classList.add("bg-gray-750", "active-radio-group");
        if (currentLabel) {
          currentLabel.classList.add("text-yellow-300");
          currentLabel.classList.remove("text-gray-200");
        }
        if (currentVisualOuter) {
          currentVisualOuter.classList.add("border-yellow-400");
          currentVisualOuter.classList.remove("border-gray-500");
        }
      }
    });

    const group = radio.closest(".group");
    if (group) {
      group.addEventListener("click", function (e) {
        if (e.target.tagName !== "INPUT") {
          e.preventDefault();
          radio.click();
          e.stopPropagation();
        }
      });
    }
  });

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const prodi = document.getElementById("prodi").value;
    const peminatan = document.querySelector(
      'input[name="peminatan"]:checked'
    )?.value;

    if (!peminatan) {
      alert("Silakan pilih area peminatan.");
      return;
    }

    alert(
      `Pendaftaran berhasil!\n\nNama: ${nama}\nNIM: ${nim}\nProdi: ${prodi}\nPeminatan: ${peminatan}`
    );

    this.reset();

    // Trigger change event untuk reset styling radio
    document
      .querySelectorAll('input[type="radio"].dark-theme-radio')
      .forEach((radio) => {
        radio.dispatchEvent(new Event("change"));
      });
  });
