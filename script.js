 // Danh sách các hình ảnh trang trí
        const decorationImages = [
            'moon.png',
            'night.png',
            'shooting-star (1).png',
            'shooting-star (2).png',
            'shooting-star.png',
            'star (1).png',
            'star (2).png',
            'star.png',
            'christmas-cookie.png',
            'darkness.png',
            'islam.png',
            'moon (2).png',
            'shooting-star (3).png',
            'star (3).png',
            'star-rating.png',
            'stars.png',
        ];

        // Hàm hiển thị thiệp mời
        function showInvitation() {
            const waitingPage = document.getElementById('waiting-page');
            const mainPage = document.getElementById('main-page');
            
            // Ẩn trang chờ
            waitingPage.style.opacity = '0';
            waitingPage.style.transition = 'opacity 1s ease';
            
            setTimeout(() => {
                waitingPage.style.display = 'none';
                mainPage.style.display = 'flex';
                
                // Tạo hiệu ứng chuyển cảnh
                createStars();
                createFloatingElements();
                startFireworks();
            }, 1000);
        }

        // Tạo sao lấp lánh
        function createStars() {
            const mainPage = document.getElementById('main-page');
            const starCount = 100;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Kích thước ngẫu nhiên
                const size = Math.random() * 3 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Vị trí ngẫu nhiên
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // Độ trễ animation ngẫu nhiên
                star.style.animationDelay = `${Math.random() * 3}s`;
                
                mainPage.appendChild(star);
            }
        }

        // Tạo các phần tử trang trí di chuyển
        function createFloatingElements() {
            const mainPage = document.getElementById('main-page');
            const elementCount = 20;
            
            for (let i = 0; i < elementCount; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                
                // Chọn hình ảnh ngẫu nhiên
                const randomIndex = Math.floor(Math.random() * decorationImages.length);
                element.style.backgroundImage = `url('${decorationImages[randomIndex]}')`;
                
                // Vị trí ngẫu nhiên
                const left = Math.random() * (window.innerWidth - 60);
                const top = Math.random() * (window.innerHeight - 60);
                
                element.style.left = `${left}px`;
                element.style.top = `${top}px`;
                
                // Kích thước ngẫu nhiên
                const size = 30 + Math.random() * 50;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                
                // Tốc độ di chuyển ngẫu nhiên
                const speedX = (Math.random() - 0.5) * 2;
                const speedY = (Math.random() - 0.5) * 2;
                
                element.dataset.speedX = speedX;
                element.dataset.speedY = speedY;
                
                mainPage.appendChild(element);
            }
            
            // Bắt đầu di chuyển các phần tử
            moveFloatingElements();
        }

        // Di chuyển các phần tử trang trí
        function moveFloatingElements() {
            const elements = document.querySelectorAll('.floating-element');
            
            elements.forEach(element => {
                let left = parseFloat(element.style.left);
                let top = parseFloat(element.style.top);
                let speedX = parseFloat(element.dataset.speedX);
                let speedY = parseFloat(element.dataset.speedY);
                
                // Đổi hướng khi chạm biên
                if (left <= 0 || left >= window.innerWidth - 60) {
                    speedX = -speedX;
                    element.dataset.speedX = speedX;
                }
                
                if (top <= 0 || top >= window.innerHeight - 60) {
                    speedY = -speedY;
                    element.dataset.speedY = speedY;
                }
                
                // Cập nhật vị trí
                element.style.left = `${left + speedX}px`;
                element.style.top = `${top + speedY}px`;
            });
            
            requestAnimationFrame(moveFloatingElements);
        }

        // Tạo hiệu ứng pháo hoa
        function startFireworks() {
            setInterval(() => {
                createFirework();
            }, 800);
        }

        function createFirework() {
            const mainPage = document.getElementById('main-page');
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Vị trí ngẫu nhiên
            const left = Math.random() * window.innerWidth;
            const top = window.innerHeight;
            
            firework.style.left = `${left}px`;
            firework.style.top = `${top}px`;
            
            // Màu sắc ngẫu nhiên
            const colors = ['#FF8C00', '#FF6347', '#FF4500', '#FFD700', '#FF69B4', '#00CED1'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            firework.style.backgroundColor = color;
            
            mainPage.appendChild(firework);
            
            // Xóa pháo hoa sau khi nổ
            setTimeout(() => {
                firework.remove();
            }, 1500);
        }

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            const elements = document.querySelectorAll('.floating-element');
            elements.forEach(element => {
                let left = parseFloat(element.style.left);
                let top = parseFloat(element.style.top);
                
                // Đảm bảo phần tử không ra khỏi màn hình
                if (left > window.innerWidth - 60) {
                    element.style.left = `${window.innerWidth - 60}px`;
                    element.dataset.speedX = -Math.abs(element.dataset.speedX);
                }
                
                if (top > window.innerHeight - 60) {
                    element.style.top = `${window.innerHeight - 60}px`;
                    element.dataset.speedY = -Math.abs(element.dataset.speedY);
                }
            });
        });