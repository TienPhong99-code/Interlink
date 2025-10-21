export default function UpfileModule() {
  // upfile module
  const upload = document.querySelectorAll(".rating-review");
  console.log(upload.length);
  if (upload.length > 0) {
    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("fileInput");
    const previewContainer = document.getElementById("previewContainer");
    //tạo mảng lưu file
    let displayedFiles = [];
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = "#f2f2f2";
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.style.backgroundColor = "#fff";
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = "#fff";
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    fileInput.addEventListener("change", () => {
      const files = fileInput.files;
      handleFiles(files);
    });

    function handleFiles(files) {
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.classList.add("previewImage");

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            deleteButton.addEventListener("click", () => {
              img.closest("div").remove();
              img.remove();
              deleteButton.remove();
              displayedFiles = displayedFiles.filter(
                (displayedFile) => displayedFile !== file
              );
              updateInputFiles(); // Cập nhật input file sau khi xóa
            });

            const imageContainer = document.createElement("div");
            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteButton);
            previewContainer.appendChild(imageContainer);

            displayedFiles.push(file); // Thêm file vào mảng hiển thị
            updateInputFiles(); // Cập nhật input file sau khi thêm
          };
          reader.readAsDataURL(file);
        }
      }
    }

    function updateInputFiles() {
      // Xóa giá trị input file hiện tại
      fileInput.value = "";

      const fileList = new DataTransfer();
      displayedFiles.forEach((file) => {
        fileList.items.add(file);
      });

      // Cập nhật lại input file
      fileInput.files = fileList.files;
    }
  }
}
