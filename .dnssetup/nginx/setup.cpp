#include <iostream>
#include <cstdlib>

void setupNginx() {
    std::cout << "Installing Nginx..." << std::endl;
    system("sudo apt update");
    system("sudo apt install nginx -y");
    std::cout << "Nginx installed successfully." << std::endl;
}

void setupCertbot() {
    std::cout << "Installing Certbot..." << std::endl;
    system("sudo apt install certbot python3-certbot-nginx -y");
    std::cout << "Certbot installed successfully." << std::endl;
}

int main() {
    setupNginx();
    setupCertbot();
    std::cout << "Setup completed." << std::endl;
    return 0;
}