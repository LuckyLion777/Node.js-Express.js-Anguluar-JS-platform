WHAT TO DO:
    - Edit jwt to use key pair.
    - Implement user bookmark.
    - When removing non-existing item from embedded array no err is thrown.
    - When GET localhost:3000/api/articles/57a06de21e5cc13c0fad7196 you get unauthorized, fix it.
    - Secure admin CRUD.
    - Make sure user can not change its status manually.
    - Implement the security checks.

    
Vagrant Setup:
    sudo apt-get update
    sudo apt-get install -y git
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    echo "cd /vagrant" >> ~/.bashrc