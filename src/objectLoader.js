import * as THREE from 'three';
import { Group } from 'three';

function loadMap(gltfLoader, mixer, scene) {
    gltfLoader.load('objects/map2.2.glb', (gltf) => {
        const oceanMesh = gltf.scene.children.find((child) => child.name === 'Ocean');
        oceanMesh.material.transparent = true;
        oceanMesh.material.opacity = 0.7;

        const bottomMesh = gltf.scene.children.find((child) => child.name === 'BottomOfMap');
        bottomMesh.receiveShadow = true;

        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer
                .clipAction(clip)
                .play();
        });

        scene.add(gltf.scene);

        gltf.scene.position.set(8, 0, -6);
    });
}

function fish1Loader(gltfLoader, mixer1,fishGroup, scene, x, z) {
    gltfLoader.load('objects/fish1.glb', (fish1) => {
        mixer1 = new THREE.AnimationMixer(fish1.scene);
        fish1.scene.scale.set(1.5, 1.5, 1.5);
        fish1.scene.position.set(x, 2, z);
        fish1.animations.forEach((clip) => {
            mixer1
                .clipAction(clip)
                .play();
        });
        fishGroup.add(fish1.scene);
        scene.add(fishGroup);
    });
}

function shipLoader(gltfLoader, scene) {
    gltfLoader.load('objects/ship1.glb', (ship) => {
        ship.scene.position.y = -4.6;
        scene.add(ship.scene);
        box = new THREE.Box3().setFromObject(ship.scene);
        box.getCenter(ship.scene.position);
        ship.scene.position.multiplyScalar(-1);
        scene.add(pivot);
        pivot.add(ship.scene);
        pivot.position.set(game2worldCoordX(1), 0, game2worldCoordZ(17));
        pivot.rotateY((Math.PI / 180) * 180);
    });
}

function rock2x1Loader1(gltfLoader, x1, x2, z1, z2) {
    gltfLoader.load('objects/rock_1x2_1.glb', (rock) => {
        rock.scene.position.set(
            (game2worldCoordX(x1) + game2worldCoordX(x2)) / 2,
            3.5,
            (game2worldCoordZ(z1) + game2worldCoordZ(z2)) / 2,
        );

        rock.scene.scale.set(0.7, 0.8, 0.7);
        scene.add(rock.scene);
    });
}
function maidensTowerLoader(gltfLoader, x1, x2, z1, z2) {
    gltfLoader.load('objects/kizkulesi.glb', (kizK) => {
        kizK.scene.position.set(
            (game2worldCoordX(x1) + game2worldCoordX(x2)) / 2 - 0.42,
            4.1,
            (game2worldCoordZ(z1) + game2worldCoordZ(z2)) / 2 + 0.05,
        );

        kizK.scene.scale.set(0.18, 0.16, 0.13);
        scene.add(kizK.scene);
    });
}
function mucilageLoader(gltfLoader, x, z) {
    gltfLoader.load('objects/mucilage.glb', (musilage) => {
        musilage.scene.position.set(game2worldCoordX(x), 4.1, game2worldCoordZ(z));
        musilage.scene.scale.set(2, 1, 2);
        const mucilageGroup = new Group();
        mucilageGroup.add(musilage.scene);
        dirtiesArray.push(mucilageGroup);

        scene.add(mucilageGroup);
    });
}
function snotLoader(gltfLoader, x, z) {
    gltfLoader.load('objects/snot.glb', (snot) => {
        snot.scene.position.set(game2worldCoordX(x), 4.1, game2worldCoordZ(z));
        snot.scene.scale.set(1.2, 1, 1.2);
        const snotGroup = new Group();
        snotGroup.add(snot.scene);
        dirtiesArray.push(snotGroup);
        scene.add(snotGroup);
    });
}
function rock1x1Loader1(gltfLoader, x1, z1) {
    gltfLoader.load('objects/rock1x1_1.glb', (rock1x1) => {
        rock1x1.scene.position.set(game2worldCoordX(x1), 3, game2worldCoordZ(z1));

        rock1x1.scene.scale.set(0.5, 0.3, 0.7);
        scene.add(rock1x1.scene);
    });
}

function rock2x2Loader1(gltfLoader, x1, x2, z1, z2) {
    gltfLoader.load('objects/island2x2.glb', (island) => {
        island.scene.position.set((game2worldCoordX(x1)
            + game2worldCoordX(x2)) / 2, 4, (game2worldCoordZ(z1)
            + game2worldCoordZ(z2)) / 2);
        island.scene.scale.set(0.5, 0.8, 0.7);
        scene.add(island.scene);
    });
}

module.exports = {
    loadMap,
    fish1Loader,
    shipLoader,
    rock1x1Loader1,
    rock2x1Loader1,
    rock2x2Loader1,
    snotLoader,
    mucilageLoader,
    maidensTowerLoader
};