# copied from:
# https://gist.github.com/scr1p7ed/4fb6728613b6bd5b185cb3e8314f07a4
# checkout, compile & install
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
sudo apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool
./autogen.sh
./configure
make
sudo make install

# raise inotify limit
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches     && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events  && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && \
  watchman shutdown-server
