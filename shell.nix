{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = with pkgs; [
    cargo
    nodejs
    nodePackages.pnpm
  ];
}
