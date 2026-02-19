document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      document.getElementById("result").innerText = "문의가 정상 접수되었습니다.";
      this.reset();
    } else {
      document.getElementById("result").innerText = "전송 실패. 다시 시도해주세요.";
    }
  } catch (error) {
    document.getElementById("result").innerText = "서버 연결 오류.";
  }
});