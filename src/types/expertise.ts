import type { ComponentType } from 'react';

export type ExpertiseSectionId =
	| 'complete-toolset'
	| 'fundamentals'
	| 'back-end'
	| 'front-end'
	| 'mobile'
	| 'full-stack';

export type ExpertiseItemKind = 'technology' | 'concept';

export type ExpertiseItemId =
	| 'c'
	| 'cpp'
	| 'java'
	| 'python'
	| 'php'
	| 'html'
	| 'css'
	| 'javascript'
	| 'typescript'
	| 'sql'
	| 'spring-boot'
	| 'react'
	| 'react-native'
	| 'nodejs'
	| 'express'
	| 'nextjs'
	| 'django'
	| 'laravel'
	| 'vue'
	| 'uniapp'
	| 'expo'
	| 'tailwind'
	| 'bootstrap'
	| 'daisyui'
	| 'ant-design'
	| 'chakra-ui'
	| 'jotai'
	| 'react-testing-library'
	| 'git'
	| 'github'
	| 'docker'
	| 'postman'
	| 'photoshop'
	| 'mysql'
	| 'mysql-workbench'
	| 'excel'
	| 'prisma'
	| 'arduino'
	| 'rad-studio'
	| 'unity'
	| 'deep-learning'
	| 'virtual-reality'
	| 'unit-testing'
	| 'arrays'
	| 'linked-lists'
	| 'stacks'
	| 'queues'
	| 'hash-tables'
	| 'binary-trees'
	| 'avl-trees'
	| 'heaps'
	| 'tries'
	| 'graphs'
	| 'undirected-graphs'
	| 'linear-search'
	| 'binary-search'
	| 'ternary-search'
	| 'jump-search'
	| 'exponential-search'
	| 'bubble-sort'
	| 'selection-sort'
	| 'insertion-sort'
	| 'merge-sort'
	| 'quick-sort'
	| 'counting-sort'
	| 'bucket-sort'
	| 'oop'
	| 'simplicity'
	| 'srp'
	| 'ocp'
	| 'lsp'
	| 'isp'
	| 'dependency-inversion'
	| 'dependency-injection'
	| 'dry'
	| 'kiss'
	| 'abstraction'
	| 'encapsulation'
	| 'composition'
	| 'polymorphism'
	| 'prototype'
	| 'singleton'
	| 'factory-method'
	| 'abstract-factory'
	| 'builder'
	| 'composite'
	| 'adapter'
	| 'decorator'
	| 'facade'
	| 'flyweight'
	| 'bridge'
	| 'proxy'
	| 'memento'
	| 'state'
	| 'iterator'
	| 'strategy'
	| 'template-method'
	| 'command'
	| 'observer'
	| 'mediator'
	| 'chain-of-responsibility'
	| 'visitor'
	| 'interpreter';

export type ExpertiseLabelKey =
	| 'completeToolset'
	| 'fundamentals'
	| 'backEndDevelopment'
	| 'frontEndDevelopment'
	| 'mobileDevelopment'
	| 'fullStackDevelopment'
	| 'languages'
	| 'webDataFoundations'
	| 'frameworksRuntimes'
	| 'uiStateLibraries'
	| 'qualityTesting'
	| 'developerTools'
	| 'specializedTechnologies'
	| 'dataStructures'
	| 'linearDataStructures'
	| 'nonLinearDataStructures'
	| 'algorithms'
	| 'searchingAlgorithms'
	| 'sortingAlgorithms'
	| 'softwareDesign'
	| 'designPrinciples'
	| 'gofPatterns'
	| 'creationalPatterns'
	| 'structuralPatterns'
	| 'behavioralPatterns'
	| 'javaStack'
	| 'javascriptStack'
	| 'pythonStack'
	| 'phpStack'
	| 'mobileFrameworks'
	| 'arrays'
	| 'linkedLists'
	| 'stacks'
	| 'queues'
	| 'hashTables'
	| 'binaryTrees'
	| 'avlTrees'
	| 'heaps'
	| 'tries'
	| 'graphs'
	| 'undirectedGraphs'
	| 'linearSearch'
	| 'binarySearch'
	| 'ternarySearch'
	| 'jumpSearch'
	| 'exponentialSearch'
	| 'bubbleSort'
	| 'selectionSort'
	| 'insertionSort'
	| 'mergeSort'
	| 'quickSort'
	| 'countingSort'
	| 'bucketSort'
	| 'objectOrientedProgramming'
	| 'simplicity'
	| 'singleResponsibility'
	| 'openClosed'
	| 'liskovSubstitution'
	| 'interfaceSegregation'
	| 'dependencyInversion'
	| 'dependencyInjection'
	| 'dry'
	| 'kiss'
	| 'abstraction'
	| 'encapsulation'
	| 'composition'
	| 'polymorphism'
	| 'prototype'
	| 'singleton'
	| 'factoryMethod'
	| 'abstractFactory'
	| 'builder'
	| 'composite'
	| 'adapter'
	| 'decorator'
	| 'facade'
	| 'flyweight'
	| 'bridge'
	| 'proxy'
	| 'memento'
	| 'state'
	| 'iterator'
	| 'strategy'
	| 'templateMethod'
	| 'command'
	| 'observer'
	| 'mediator'
	| 'chainOfResponsibility'
	| 'visitor'
	| 'interpreter'
	| 'unitTesting'
	| 'deepLearning'
	| 'virtualReality';

export type ExpertiseCatalogItem = {
	readonly id: ExpertiseItemId;
	readonly kind: ExpertiseItemKind;
	readonly icon: ComponentType;
	readonly label?: string;
	readonly labelKey?: ExpertiseLabelKey;
	readonly officialUrl?: string;
};

export type SkillGraphItemNode = {
	readonly kind: 'item';
	readonly itemId: ExpertiseItemId;
};

export type SkillGraphGroupNode = {
	readonly kind: 'group';
	readonly id: string;
	readonly labelKey: ExpertiseLabelKey;
	readonly children: readonly SkillGraphNode[];
};

export type SkillGraphNode = SkillGraphItemNode | SkillGraphGroupNode;

export type ExpertiseSectionDefinition = {
	readonly id: ExpertiseSectionId;
	readonly titleKey: ExpertiseLabelKey;
	readonly defaultExpanded: boolean;
	readonly graph?: SkillGraphGroupNode;
	readonly descriptionKey?: 'fullStackBody';
};

export interface ExpertiseItemCatalogPort {
	getItem(id: ExpertiseItemId): ExpertiseCatalogItem;
}

export interface ExpertiseCatalogPort extends ExpertiseItemCatalogPort {
	getSections(): readonly ExpertiseSectionDefinition[];
}
