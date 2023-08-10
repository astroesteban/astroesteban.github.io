ARG VARIANT="22.04"
FROM ubuntu:${VARIANT} AS base

# disable prompting during package installation
ARG DEBIAN_FRONTEND=noninteractive
ARG QUARTO_VERSION=1.3.450
ARG QUARTO_URL=https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/quarto-${QUARTO_VERSION}-linux-amd64.deb

RUN apt-get update && apt-get -y upgrade \
  && apt-get install -y --no-install-recommends \
    git \
    ssh \
    sshfs \
    openssh-server \
    openssh-client \
    axel \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# setup ssh
RUN mkdir -p -m 0700 /root/.ssh && \
    mkdir /var/run/sshd && \
    echo "StrictHostKeyChecking no " > ~/.ssh/config && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

# Create symbolic links to the secrets so that we can use them with git
# Note that we need to delete any existing files to avoid a simlink error
RUN ln -s /run/secrets/ssh_public_key ~/.ssh/id_ed25519_github.pub && \
   ln -s /run/secrets/ssh_private_key ~/.ssh/id_ed25519_github && \
   ln -s /run/secrets/gitconfig ~/.gitconfig

# Install Quarto
RUN axel -n $(nproc) ${QUARTO_URL} -o quarto.deb \
  && dpkg -i "quarto.deb" \
  && rm quarto.deb

# we'll need to expose this port for jupyter notebooks
EXPOSE 4000
